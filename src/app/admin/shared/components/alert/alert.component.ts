import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [NgClass, NgIf],
})
export class AlertComponent implements OnInit {
  @Input() delay = 5000;

  public text = '';
  public type = 'success';

  private alertService = inject(AlertService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.alertService.alert$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(alert => {
        this.text = alert.text;
        this.type = alert.type;

        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.text = '';
        }, this.delay);
      });
  }
}
