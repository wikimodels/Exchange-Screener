import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertObj } from 'models/alerts/alert-obj';

@Component({
  selector: 'app-screen-modal',
  templateUrl: './screen-modal.component.html',
  styleUrls: ['./screen-modal.component.css'],
})
export class ScreenModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertObj,
    public dialogRef: MatDialogRef<ScreenModalComponent>
  ) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
