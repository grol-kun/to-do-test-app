import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TOKEN_NAME } from '../models/constants/app.constant';

describe('AuthService', () => {
  let authService: AuthService;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService, CookieService],
    });

    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should set token to cookies', () => {
    spyOn(cookieService, 'set');
    authService.setTokenToCookies('fakeToken');
    expect(cookieService.set).toHaveBeenCalledWith(
      TOKEN_NAME, 'fakeToken', jasmine.any(Object)
    );
  });

  it('should get token from cookies', () => {
    spyOn(cookieService, 'get').and.returnValue('fakeToken');
    const token = authService.getTokenFromCookies();
    expect(token).toEqual('fakeToken');
    expect(cookieService.get).toHaveBeenCalledWith(TOKEN_NAME);
  });

  it('should delete token from cookies', () => {
    spyOn(cookieService, 'delete');
    authService.deleteTokenFromCookies();
    expect(cookieService.delete).toHaveBeenCalledWith(TOKEN_NAME);
  });

  it('should return true if user is authenticated', (done: DoneFn) => {
    spyOn(cookieService, 'get').and.returnValue('fakeToken');
    authService.isAuthenticated().subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should return false if user is not authenticated', (done: DoneFn) => {
    spyOn(cookieService, 'get').and.returnValue('');
    authService.isAuthenticated().subscribe((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('should logout and navigate to /login', () => {
    spyOn(cookieService, 'delete');
    spyOn(router, 'navigate');
    authService.logout();
    expect(cookieService.delete).toHaveBeenCalledWith(TOKEN_NAME);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
