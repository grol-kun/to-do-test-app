import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { loginInfo } from '../models/interfaces/login-info.model';
import { AuthorizationResponse } from '../models/interfaces/authorization-response.model';
import { TOKEN_NAME } from '../models/constants/app.constant';

const ADMIN = 'admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {}

  public login(userData: loginInfo): Observable<AuthorizationResponse> {
    return of(
      userData.identifier === ADMIN && userData.password === ADMIN
        ? { jwt: 'TOKEN$$$' }
        : { error: 'Incorrect credentials' }
    );
  }

  public setAuthenticated(): void {
    this.isAuthenticatedSubject.next(true);
  }

  public setUnAuthenticated(): void {
    this.isAuthenticatedSubject.next(false);
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

  public setTokenIfAvailable(): void {
    const potentialToken = this.getTokenFromCookies();
    if (potentialToken) {
      this.setAuthenticated();
    }
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  public logout(): void {
    this.setUnAuthenticated();
    this.deleteTokenFromCookies();
    this.router.navigate(['/login']);
  }
}
