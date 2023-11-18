import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';

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

  public ngOnInit(): void {
    this.form = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  public onAuthSubmit(): void {
    const { identifier, password, remember } = this.form.getRawValue();

    this.authService
      .login({ identifier, password })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.jwt) {
          this.authService.setTokenToCookies(data.jwt);
          this.router.navigate(['/']);
        } else if (data.error) {
          this.message.open(data.error, 'Close');
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
