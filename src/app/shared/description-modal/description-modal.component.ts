import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { Alert } from 'models/alerts/alert';

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.css'],
  animations: [
    trigger('fadeIn', [
      // Define a hidden state with opacity 0
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      // Define a visible state with opacity 1
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      // Define a transition from hidden to visible with an animation duration of 1s
      transition('hidden => visible', [animate('1s ease-in')]),
    ]),
  ],
})
export class DescriptionModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Alert,
    public dialogRef: MatDialogRef<DescriptionModalComponent>
  ) {}
  imageLoaded: boolean = false; // Tracks if the actual image has
  placeholderImage: string = 'assets/img/placeholder600x400.svg'; //

  closeDialog() {
    this.dialogRef.close();
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
