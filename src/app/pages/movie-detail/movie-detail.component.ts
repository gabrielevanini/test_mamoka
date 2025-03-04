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

interface IMovieDetail {
  id: number;
  available: boolean;
  category: Array<IMovieCategory>;
  director: string;
  title: string;
  year: number;
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
        this.setFormMovieField = movieDetail;
      });
  }
  public saveMovie = () => {
    return false;
  };
  private set setFormMovieField(movieDetail: IMovieDetail) {
    this.formMovieDetail.controls.director.setValue(movieDetail.director);
    this.formMovieDetail.controls.title.setValue(movieDetail.title);
    this.formMovieDetail.controls.year.setValue(movieDetail.year);
    this.formMovieDetail.controls.category.setValue(movieDetail.category);
  }
  //private setMoviesCategories = () => {};
}
