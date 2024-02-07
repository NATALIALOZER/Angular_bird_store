import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { IUser } from '@shared/common_types/interfaces';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { fbAuthResponse } from './services_types/auth-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return <string>localStorage.getItem('fb-token');
  }

  public login(user: IUser): Observable<any> {
    user.returnSecureToken = true;

    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(
        tap(res => this.setToken(res as fbAuthResponse)),
        catchError(this.handleError.bind(this))
      );
  }

  public logout(): void {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Помилковий email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Dude, твій пароль невірний');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email не існує');
        break;
    }

    return throwError(error);
  }

  private setToken(response: fbAuthResponse | null): void {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      /*localStorage.clear()*/
    }
  }
}
