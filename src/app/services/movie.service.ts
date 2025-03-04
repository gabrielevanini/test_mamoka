import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiURL = 'http://kamaji2.dev.netbuilder.it/00900000/';
  private categoriesURL = '_categories';
  private moviesURL = 'movies';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMoviesCategories(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiURL}${this.categoriesURL}`;
    return this.http.get(url, { headers });
  }
  getMovies(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiURL}${this.moviesURL}`;
    return this.http.get(url, { headers });
  }

  getMovie(id: number | string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiURL}${this.moviesURL}/${id}`;
    return this.http.get(url, { headers });
  }
}
