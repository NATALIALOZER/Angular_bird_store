import { Component } from '@angular/core';
import { ButtonSize, ButtonType } from '@shared/components/button/button';
import { MaterialModule } from '@shared/material/material.module';
import { NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    MaterialModule,
    NgStyle,
    FormsModule,
    RouterLink,
    ButtonComponent,
    RouterOutlet,
    NgIf,
  ],
})
export class MainLayoutComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
  public ButtonType: typeof ButtonType = ButtonType;
  /*checkbox*/
  public checked = false;
}
