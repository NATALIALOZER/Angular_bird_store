import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { WithDestroy } from '@shared/mixins/destroy';
import { takeUntil } from 'rxjs/operators';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [
    NgClass,
    NgIf
  ]
})
export class AlertComponent extends WithDestroy() implements OnInit {
  @Input() delay = 5000;

  public text = '';
  public type = 'success';

  constructor(private alertService: AlertService) {
    super();
  }

  ngOnInit(): void {
    this.alertService.alert$.pipe(takeUntil(this.destroy$)).subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  }
}
