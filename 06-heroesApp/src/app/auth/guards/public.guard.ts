import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if( isAuthenticated ) {
            this.router.navigate(['./'])
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

}
