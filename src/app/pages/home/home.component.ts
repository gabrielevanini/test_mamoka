import { Component, OnInit } from '@angular/core';
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
  ];
  constructor(private movieService: MovieService) {}
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
}
