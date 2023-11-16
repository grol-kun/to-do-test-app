import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class Initializer {
  constructor(
    private authService: AuthService
  ) {}

  public initApp(): void {
    this.authService.setTokenIfAvailable();
  }
}
