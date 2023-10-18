import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard  {
  constructor(private auth: AuthService, private router: Router) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean | any {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          loginAgain: true,
        },
      });
    }
  }
}
