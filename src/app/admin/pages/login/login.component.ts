import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import { IUser } from '@shared/common_types/interfaces';
import { WithDestroy } from '@shared/mixins/destroy';
import { ILoginForm } from './types/login';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginComponent extends WithDestroy() implements OnInit {
  public form!: FormGroup<ILoginForm>;
  public submitted = false;
  public message = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        if (params['loginAgain']) {
          this.message = 'Будь ласака, внесіть дані';
        } else if (params['authFailed']) {
          this.message = 'Сесія закінчилась. Веддіть дані повторно';
        }
      });

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
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.form.reset();
          this.router.navigate(['/admin', 'dashboard']);
          this.submitted = false;
        },
        () => (this.submitted = false)
      );
  }
}
