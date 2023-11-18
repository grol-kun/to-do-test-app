import { Route, Router, Routes, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';

import { map, take } from 'rxjs/operators';

import { AuthService } from './shared/services/auth.service';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
    canMatch: [
      (route: Route, segments: UrlSegment[]) => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated().pipe(
          take(1),
          map((isAuth) => isAuth || router.createUrlTree(['/login']))
        );
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
