import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { loginInfo } from '../shared/models/interfaces/login-info';
import { AuthorizationResponse } from '../shared/models/interfaces/authorization-response';

const ADMIN = 'admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor() {}

  public login(userData: loginInfo): Observable<AuthorizationResponse> {
    return of(
      userData.identifier === ADMIN && userData.password === ADMIN
        ? { jwt: 'TOKEN$$$' }
        : { error: 'Incorrect credentials' }
    );
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public removeToken(): void {
    this.token = null;
  }
}
