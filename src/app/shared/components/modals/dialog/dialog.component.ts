import { Component, HostListener, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
    },
    private mdDialogRef: MatDialogRef<DialogComponent>
  ) {}

  public cancel(): void {
    this.close(false);
  }
  public close(value: boolean | string): void {
    this.mdDialogRef.close(value);
  }
  public confirm(): void {
    this.close(true);
  }
  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }
}
