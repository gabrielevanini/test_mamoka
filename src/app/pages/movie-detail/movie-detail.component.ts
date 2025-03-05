import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  category: any[];
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
  public movieId: number = 0;
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
    this.movieId = this.activatedRoute.snapshot.params['id'];
    combineLatest([
      this.movieService.getMoviesCategories(),
      this.movieService.getMovie(this.movieId),
    ])
      .pipe()
      .subscribe(([movieCategories, movieDetail]) => {
        this.movieCategories = [...movieCategories];
        this.setFormMovieField = movieDetail;
      });
  }
  public saveMovie = () => {
    const jsonData: Partial<IMovieDetail> = this.formMovieDetail.value;
    const catId = jsonData.category ?? [];
    jsonData.category = [catId];
    this.movieService
      .saveMovie(this.movieId, jsonData)
      .pipe()
      .subscribe((res) => {
        this.router.navigate(['/movie-list'], { queryParams: null });
      });
  };
  private set setFormMovieField(movieDetail: IMovieDetail) {
    this.formMovieDetail.controls.director.setValue(movieDetail.director);
    this.formMovieDetail.controls.title.setValue(movieDetail.title);
    this.formMovieDetail.controls.year.setValue(movieDetail.year);
    this.formMovieDetail.controls.category.setValue(
      movieDetail?.category[0]?.id
    );
  }
  //private setMoviesCategories = () => {};
}
