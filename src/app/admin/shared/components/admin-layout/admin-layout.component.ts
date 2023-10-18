import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  imports: [
    AlertComponent,
    RouterLink,
    NgIf,
    RouterLinkActive,
    RouterOutlet
  ]
})
export class AdminLayoutComponent {
  constructor(private router: Router, public auth: AuthService) {}

  public logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
