import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AuthComponent implements OnInit {
  public form!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAuthSubmit() {
    const { identifier, password, remember } = this.form.getRawValue();

    this.authService
      .login({ identifier, password })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.jwt) {
          this.authService.setToken(data.jwt);
          if (remember) {
            //TODO: Implement possibility to store jwt after reloading the app
            // this.authService.setTokenToCookies(data.jwt);
          }
          this.router.navigate(['/']);
        } else if (data.error) {
          this.message.open(data.error, 'Close');
        }
      });
  }
}
