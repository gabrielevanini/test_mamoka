import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
interface IFormMovieDetail {
  director: FormControl<any>;
  title: FormControl<any>;
  year: FormControl<any>;
  category: FormControl<any>;
}
interface IMovieCategory {
  id: number;
  name: string;
}

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  public movieCategories: Array<IMovieCategory> = [];
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}
  formMovieDetail = new FormGroup<IFormMovieDetail>({
    director: new FormControl<any>(null, {
      validators: [Validators.required],
    }),
    title: new FormControl<any>(null, {
      validators: [Validators.required],
    }),
    year: new FormControl<any>(null, {
      validators: [Validators.required],
    }),
    category: new FormControl<any>(null, {
      validators: [Validators.required],
    }),
  });
  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['id'];
    combineLatest([
      this.movieService.getMoviesCategories(),
      this.movieService.getMovie(movieId),
    ])
      .pipe()
      .subscribe(([movieCategories, movieDetail]) => {
        console.log(movieDetail);
        this.movieCategories = [...movieCategories];
      });
  }
  public saveMovie = () => {
    return false;
  };
  //private setMoviesCategories = () => {};
}
