import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthComponent } from './auth.component';
import { AuthService } from '../shared/services/auth.service';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;
  let router: Router;
  let message: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: MatSnackBar, useValue: { open: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    message = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create AuthComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
  });

  it('should submit authentication data to the server', () => {
    spyOn(authService, 'login').and.returnValue(of({ jwt: 'fakeToken' }));
    spyOn(router, 'navigate');
    component.form.setValue({ identifier: 'testUser', password: 'testPassword', remember: false });
    component.onAuthSubmit();
    expect(authService.login).toHaveBeenCalledWith({ identifier: 'testUser', password: 'testPassword' });
  });

  it('should navigate to the home page after successful login', () => {
    spyOn(authService, 'login').and.returnValue(of({ jwt: 'fakeToken' }));
    spyOn(router, 'navigate');
    component.onAuthSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display an error message if login fails', () => {
    spyOn(authService, 'login').and.returnValue(of({ error: 'Invalid credentials' }));
    spyOn(message, 'open');
    component.onAuthSubmit();
    expect(message.open).toHaveBeenCalledWith('Invalid credentials', 'Close');
  });

  it('should unsubscribe from subscriptions on component destruction', () => {
    // @ts-ignore
    const destroy = component.destroy$
    spyOn(destroy, 'next');
    spyOn(destroy, 'complete');
    component.ngOnDestroy();
    expect(destroy.next).toHaveBeenCalled();
    expect(destroy.complete).toHaveBeenCalled();
  });

  it('should have proper validators for form fields', () => {
    const identifierControl = component.form.get('identifier');
    const passwordControl = component.form.get('password');

    expect(identifierControl?.hasValidator(Validators.required)).toBeTrue();
    expect(passwordControl?.hasValidator(Validators.required)).toBeTrue();
  });

  it('should call setTokenToCookies on successful login', () => {
    spyOn(authService, 'login').and.returnValue(of({ jwt: 'fakeToken' }));
    spyOn(authService, 'setTokenToCookies');
    component.onAuthSubmit();
    expect(authService.setTokenToCookies).toHaveBeenCalledWith('fakeToken');
  });

  it('should set default values for the form', () => {
    const formValues = { identifier: '', password: '', remember: false };
    expect(component.form.value).toEqual(formValues);
  });

  it('should unsubscribe from observables on component destruction', () => {
    // @ts-ignore
    const destroy = component.destroy$;
    spyOn(destroy, 'next');
    spyOn(destroy, 'complete');
    component.ngOnDestroy();
    expect(destroy.next).toHaveBeenCalled();
    expect(destroy.complete).toHaveBeenCalled();
  });
});
