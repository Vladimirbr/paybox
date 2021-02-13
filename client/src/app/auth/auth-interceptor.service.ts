import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const headerSettings: { [name: string]: string | string[] } = {};

        for (const key of req.headers.keys()) {
          headerSettings[key] = req.headers.getAll(key);
        }
        headerSettings['Authorization'] = 'Bearer ' + user.token;
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
