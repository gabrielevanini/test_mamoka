import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
interface IFormMovieDetail {
  director: FormControl<any>;
  title: FormControl<any>;
}

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  constructor(private autService: AuthService) {}
  formMovieDetail = new FormGroup<IFormMovieDetail>({
    director: new FormControl<any>(null, {
      validators: [Validators.required],
    }),
    title: new FormControl<any>(null, {
      validators: [Validators.required],
    }),
  });
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public saveMovie = () => {
    return false;
  };
}
