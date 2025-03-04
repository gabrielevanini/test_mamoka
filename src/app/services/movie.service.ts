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
  public headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.getToken()}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMoviesCategories(): Observable<any> {
    const url = `${this.apiURL}${this.categoriesURL}`;
    return this.http.get(url);
  }
  getMovies(): Observable<any> {
    const url = `${this.apiURL}${this.moviesURL}`;
    return this.http.get(url);
  }

  getMovie(id: number | string): Observable<any> {
    const url = `${this.apiURL}${this.moviesURL}/${id}`;
    return this.http.get(url);
  }

  saveMovie(id: number, data: any): Observable<any> {
    const url = `${this.apiURL}${this.moviesURL}/${id}`;
    return this.http.patch(url, data);
  }
}
