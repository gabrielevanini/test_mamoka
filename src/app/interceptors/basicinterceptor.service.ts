import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class BasicinterceptorService implements HttpInterceptor {
  constructor(
    public authService: AuthService,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoading$ = true;
    if (req.url.includes('auth'))
      return next
        .handle(req)
        .pipe(finalize(() => (this.loaderService.isLoading$ = false)));

    const authToken = this.authService.getToken();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return next
      .handle(authReq)
      .pipe(finalize(() => (this.loaderService.isLoading$ = false)));
  }
}
