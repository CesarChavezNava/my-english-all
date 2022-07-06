import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authSvc: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const segments: UrlSegment[] = route.url;
    return this.authSvc.isAuthenticated().pipe(
      map((isAuth) => {
        if (isAuth && segments.length === 0) {
          this.router.navigate(['/home']);
          return true;
        } else if (
          isAuth &&
          (segments[0].path === 'home' ||
            segments[0].path === 'decks' ||
            segments[0].path === 'practices')
        ) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      first()
    );
  }
}
