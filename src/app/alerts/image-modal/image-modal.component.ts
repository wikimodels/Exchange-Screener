import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: [`./image-modal.component.css`],
})
export class ImageModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string },
    public dialogRef: MatDialogRef<ImageModalComponent>
  ) {}
  closeModal() {
    this.dialogRef.close();
  }
}
