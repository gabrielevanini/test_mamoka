import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BasicinterceptorService implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('auth')) {
      const authToken = this.authService.getToken();

      console.log(req);
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
