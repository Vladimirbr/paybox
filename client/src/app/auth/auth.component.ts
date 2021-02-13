import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(username, password);
    } else {
      authObs = this.authService.signup(username, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.errorMessage = '';
        this.showError = false;
        if (this.isLoginMode) {
          this.router.navigate(['/missions']);
        } else {
          return alert('User registreted, now you can log in');
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.errorMessage = errorMessage.message;
        this.showError = true;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
