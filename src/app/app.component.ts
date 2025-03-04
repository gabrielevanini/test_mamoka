import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Mamoka test project';

  public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    public cd: ChangeDetectorRef
  ) {
    this.authService
      .isAuthenticated()
      .pipe()
      .subscribe((authenticated: boolean) => {
        this.authenticated.next(authenticated);
        !authenticated &&
          this.router.navigate(['/login'], { queryParams: null });
      });
  }

  public doLogout = () => {
    this.authService.logout();
  };
}
