import { Route, Router, Routes, UrlSegment } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { map } from 'rxjs/operators';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
    canMatch: [
      (route: Route, segments: UrlSegment[]) => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated().pipe(
          map((isAuth) => isAuth || router.createUrlTree(['/login']))
        );
      },
    ],
  },
];
