import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { AuthService } from './shared/services/auth.service';
import { routes } from './app.routes';

describe('App Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [AuthService],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to /login if not authenticated', (done: DoneFn) => {
    spyOn(TestBed.inject(AuthService), 'isAuthenticated').and.returnValue(of(false));

    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/login');
      done();
    });
  });

  it('should navigate to / if authenticated', (done: DoneFn) => {
    spyOn(TestBed.inject(AuthService), 'isAuthenticated').and.returnValue(of(true));

    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/');
      done();
    });
  });

  it('should navigate to / if accessing an authenticated route', (done: DoneFn) => {
    spyOn(TestBed.inject(AuthService), 'isAuthenticated').and.returnValue(of(true));

    router.navigate(['authenticated-route']).then(() => {
      expect(location.path()).toBe('/');
      done();
    });
  });

  it('should redirect to /login if not authenticated and accessing an authenticated route', (done: DoneFn) => {
    spyOn(TestBed.inject(AuthService), 'isAuthenticated').and.returnValue(of(false));

    router.navigate(['authenticated-route']).then(() => {
      expect(location.path()).toBe('/login');
      done();
    });
  });

  it('should redirect to / if accessing an authenticated route and then logging out', (done: DoneFn) => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));

    router.navigate(['authenticated-route']).then(() => {
      authService.logout();
      expect(location.path()).toBe('/');
      done();
    });
  });
});
