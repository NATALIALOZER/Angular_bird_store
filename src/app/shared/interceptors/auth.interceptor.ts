import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../admin/shared/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    req = req.clone({
      setParams: {
        auth: auth.token as string,
      },
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Interceptor Error: ', error);
      if (error.status === 401) {
        auth.logout();
        router.navigate(['/admin', 'login'], {
          queryParams: {
            authFailed: true,
          },
        });
      }
      return throwError(error);
    })
  );
};
