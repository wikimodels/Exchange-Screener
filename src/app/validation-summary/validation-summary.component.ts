import { trigger, transition, animate, style } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-validation-summary',
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.css'],
  animations: [
    trigger('validationSummaryAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '250ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '250ms ease-out',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class ValidationSummaryComponent implements OnInit, OnDestroy {
  @Input() form!: FormGroup; // Change NgForm to FormGroup
  errors: string[] = [];
  private statusChangesSubscription!: Subscription;

  constructor() {}

  ngOnInit() {
    if (!this.form) {
      throw new Error('Form group is not available for validation.');
    }

    this.statusChangesSubscription = this.form.statusChanges
      ?.pipe(delay(1000))
      .subscribe(() => {
        this.resetErrorMessages();
        this.generateErrorMessages(this.form);
      });
  }

  ngOnDestroy() {
    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }
  }

  resetErrorMessages() {
    this.errors = [];
  }

  generateErrorMessages(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((controlName) => {
      if (controlName == 'imageLinks') {
        const array = formGroup.controls['imageLinks'] as FormArray;

        array.controls.forEach((c, index) => {
          if (c.errors?.['pattern'] && c.touched) {
            this.errors.push(`Image Link ${index + 1} must be a valid URL`);
          }
          if (c.errors?.['required'] && c.touched) {
            this.errors.push(`Image Link is required`);
          }
        });
      }

      const control = formGroup.controls[controlName];
      const errors = control.errors;
      if (!errors || Object.keys(errors).length === 0) {
        return;
      }

      if (control.touched && errors['pattern']) {
        this.errors.push(`${controlName} must be a Number`);
      }

      if (control.touched && errors['required']) {
        const name = this.getReadableControlName(controlName);
        this.errors.push(`${name} is required`);
      }

      if (control.touched && errors['SymbolNameNotExists']) {
        this.errors.push(`Symbol doesn't exist in the list`);
      }

      if (control.touched && errors['keyLevelNameExists']) {
        this.errors.push(`Such Key Level Name already exists`);
      }
    });
  }

  getReadableControlName(controlName: string) {
    switch (controlName) {
      case 'keyLevelName':
        return 'Key Level Name';
      case 'price':
        return 'Price';
      case 'symbol':
        return 'Symbol';
      case 'action':
        return 'Action';
      case 'description':
        return 'Description';

      default:
        return '';
    }
  }
}
