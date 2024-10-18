// snackbar.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root', // This makes the service available throughout the app
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  // Generic method to show snackbar with dynamic message and action
  showSnackBar(message: string, action: string = '', duration: number = 3000) {
    //.INFOR-SNACKBAR CSS IS DEFINED IN GLOBAL STYLES.CSS
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
    });
  }
}
