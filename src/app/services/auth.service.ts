import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface IResponseLogin {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://kamaji2.dev.netbuilder.it/00900000/';
  private loginURL = 'auth';
  private authTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage?.getItem(this.authTokenKey);
  }

  set tokenRefreshToken(tokens: any) {
    localStorage.setItem(this.authTokenKey, tokens.access_token);
    localStorage.setItem(this.refreshTokenKey, tokens.refresh_token);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(
    username: string,
    password: string,
    grant_type = 'password'
  ): Observable<any> {
    const url = `${this.apiURL}${this.loginURL}`;

    return this.http
      .post(url, {
        username,
        password,
        grant_type,
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
