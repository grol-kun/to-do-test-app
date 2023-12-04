import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { LoginInfo } from '../models/interfaces/login-info.model';
import { AuthorizationResponse } from '../models/interfaces/authorization-response.model';
import { TOKEN_NAME } from '../models/constants/app.constant';

const ADMIN = 'admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {}

  public login(userData: LoginInfo): Observable<AuthorizationResponse> {
    return of(
      userData.identifier === ADMIN && userData.password === ADMIN
        ? { jwt: 'TOKEN$$$' }
        : { error: 'Incorrect credentials' }
    );
  }

  public setTokenToCookies(token: string): void {
    this.cookieService.set(
      TOKEN_NAME, token, { secure: true, expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) }
    );
  }

  public getTokenFromCookies(): string | undefined {
    return this.cookieService.get(TOKEN_NAME);
  }

  public deleteTokenFromCookies(): void {
    this.cookieService.delete(TOKEN_NAME);
  }

  public isAuthenticated(): Observable<boolean> {
    return of(!!this.getTokenFromCookies());
  }

  public logout(): void {
    this.deleteTokenFromCookies();
    this.router.navigate(['/login']);
  }
}
