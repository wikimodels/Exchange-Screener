import { Component, Inject, NgZone, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { AlertsGenericService } from 'src/service/alerts/alerts-generic.service';
import { Alert } from 'models/alerts/alert';

@Component({
  selector: 'app-edit-inclined-alert',
  templateUrl: './edit-inclined-alert.component.html',
  styleUrls: ['./edit-inclined-alert.component.css'],
})
export class EditInclinedAlertComponent {
  logoUrl = 'assets/img/noname.png';
  displayedSymbol!: string;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertsGenericService,
    public dialogRef: MatDialogRef<EditInclinedAlertComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { collectionName: string; alert: Alert },
    private _ngZone: NgZone
  ) {}

  form!: FormGroup | null;

  filteredSymbols!: string[] | null;
  validationMessages: { [key: string]: string[] } = {};
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    this.logoUrl = this.data.alert?.image_url
      ? this.data.alert?.image_url
      : this.logoUrl;
    this.displayedSymbol = this.data.alert.symbol + ' ALERT EDIT';
    this.form = this.fb.group({
      symbol: [{ value: '', disabled: true }],
      isActive: [''],
      keyLevelName: [{ value: '', disabled: true }],
      startPrice: [{ value: '', disabled: true }],
      endPrice: [{ value: '', disabled: true }],
      startBar: [{ value: '', disabled: true }],
      endBar: [{ value: '', disabled: true }],
      action: [{ value: '', disabled: true }],
      description: ['', Validators.required],
      imageLinks: this.fb.array([]),
    });
    this.populateForm();
  }

  populateForm() {
    console.log('EDIT-ALERT TBL ---> ', this.data.alert);

    this.imageLinks.clear();
    this.form?.setValue({
      symbol: this.data.alert.symbol,
      isActive: this.data.alert.isActive,
      action: this.data.alert.action,
      keyLevelName: this.data.alert.alertName,
      startPrice: this.data.alert.startPrice,
      endPrice: this.data.alert.endPrice,
      startBar: this.data.alert.startBar,
      endBar: this.data.alert.endBar,
      description: this.data.alert.description,
      imageLinks: [], // Add the Available form control
    });
    // Populate the FormArray for imageLinks
    this.data.alert.tvImgUrls?.forEach((url: string) => {
      this.imageLinks.push(this.fb.control(url)); // Add each URL as a FormControl
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  // Create a FormControl with URL validator
  createImageLinkControl() {
    return this.fb.control('', [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
      ), // URL pattern
    ]);
  }

  get imageLinks() {
    return this.form?.get('imageLinks') as FormArray;
  }

  addLink() {
    this.imageLinks.push(this.createImageLinkControl());
  }

  removeLink(index: number) {
    if (this.imageLinks.length > 1) {
      this.imageLinks.removeAt(index);
    }
  }

  onSubmit() {
    this.form?.markAllAsTouched();
    this.imageLinks.controls.forEach((c) => {
      c.markAllAsTouched();
    });
    this.form?.markAsDirty();
    this.form?.updateValueAndValidity();
    if (this.form?.valid) {
      this.data.alert.description = this.form.get('description')?.value;
      this.data.alert.tvImgUrls = this.imageLinks.value;
      this.data.alert.isActive = this.form.get('isActive')?.value;

      this.alertService.updateOne(this.data.collectionName, this.data.alert);

      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
