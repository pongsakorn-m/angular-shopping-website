import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,
              private router: Router,
              private authService: AuthService) {
  }
  canActivate() {
    return this.authService.isAuthenticated().pipe(map(u => {
      if (!u) {
        this.router.navigateByUrl("/login");
        return false;
      } else {
        return true
      }
    }));
  }
}
