import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public dataSource: any;
  public displayedColumns: string[] = [
    'id',
    'year',
    'title',
    'category',
    'available',
    'action',
  ];
  constructor(private movieService: MovieService, private router: Router) {}
  ngOnInit(): void {
    this.movieService
      .getMovies()
      .pipe()
      .subscribe((movies) => {
        console.log(movies);
        this.dataSource = movies;
      });
  }
  public getAvailable(value: boolean) {
    return value ? 'Available' : 'Not available';
  }
  public openMovieDetail = (id: string | number) => {
    console.log(id);
    this.router.navigate([`/movie-detail/${id}`], { queryParams: null });
  };
}
