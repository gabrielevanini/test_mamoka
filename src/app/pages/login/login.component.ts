import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface IFormLogin {
  username: FormControl<any>;
  password: FormControl<any>;
  grant_type: FormControl<any>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(private autService: AuthService, private router: Router) {}

  formLogin = new FormGroup<IFormLogin>({
    username: new FormControl<any>(null, {
      validators: [Validators.required],
    }),
    password: new FormControl<any>(null, {
      validators: [Validators.required, Validators.minLength(8)],
    }),
    grant_type: new FormControl<string>(''),
  });

  public doLogin = () => {
    const username = this.formLogin.controls.username.getRawValue();
    const pwd = this.formLogin.controls.password.getRawValue();
    this.autService.login(username, pwd).subscribe((res) => {
      if (res) {
        this.autService.tokenRefreshToken = res;
        this.autService.isAuthenticatedSubject.next(true);
        this.router.navigate(['/movie-list'], { queryParams: null });
      }
    });
  };
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // TODO remove
    this.formLogin.controls.username.setValue('gabriele.vanini@gmail.com');
    this.formLogin.controls.password.setValue('mamoka0403');
  }
}
