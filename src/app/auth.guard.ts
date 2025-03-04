import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Logica per verificare se l'utente è autenticato
    if (this.authService.getToken()) {
      return true; // Permetti l'accesso alla rotta
    } else {
      // Se non autenticato, reindirizza alla pagina di login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
