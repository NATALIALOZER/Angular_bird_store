import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { map } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import { IUser } from '@shared/common_types/interfaces';
import { ILoginForm } from './types/login';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup<ILoginForm>;
  public submitted = false;
  public message = '';
  public auth = inject(AuthService);

  private router = inject(Router);
  private route$ = inject(ActivatedRoute).queryParams;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getRouteState();
    this.createLoginForm();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    } as IUser;

    this.auth
      .login(user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        () => {
          this.form.reset();
          this.router.navigate(['/admin', 'dashboard']);
          this.submitted = false;
        },
        () => (this.submitted = false)
      );
  }

  private getRouteState(): void {
    this.route$
      .pipe(
        map((params: Params) => {
          this.message = params['loginAgain']
            ? 'Будь ласака, внесіть дані'
            : params['authFailed']
            ? 'Сесія закінчилась. Веддіть дані повторно'
            : '';
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private createLoginForm(): void {
    this.form = new FormGroup<ILoginForm>({
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
