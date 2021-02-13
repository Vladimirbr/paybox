import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  user: string;
  token: string;
  id: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(username: string, password: string) {
    return this.http.post<AuthResponseData>(
      'http://localhost:3000/api/v1/auth/register',
      {
        username: username,
        password: password,
      }
    );
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/api/v1/auth/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.user,
            resData.token,
            resData.id,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      username: string;
      _token: string;
      id: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(
        userData._tokenExpirationDate
      ).getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    username: string,
    _token: string,
    id: string,

    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username, id, _token, expirationDate);
    this.user.next(user);
    this.autoLogout(expirationDate.getTime());
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
