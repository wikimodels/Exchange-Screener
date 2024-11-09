import { Component, Inject, NgZone, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { CoinsCollections } from 'models/coin/coins-collections';
import { AlertsGenericService } from 'src/service/alerts/alerts-generic.service';
import { Alert } from 'models/alerts/alert';

@Component({
  selector: 'app-edit-alert',
  templateUrl: './edit-alert.component.html',
  styleUrls: ['./edit-alert.component.css'],
})
export class EditAlertComponent {
  constructor(
    private fb: FormBuilder,
    private coinsService: CoinsGenericService,
    private alertService: AlertsGenericService,
    public dialogRef: MatDialogRef<EditAlertComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { collectionName: string; alert: Alert },
    private _ngZone: NgZone
  ) {}

  form!: FormGroup | null;
  symbols!: string[] | null;
  filteredSymbols!: string[] | null;
  validationMessages: { [key: string]: string[] } = {};
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    this.symbols = this.coinsService
      .getCoins(CoinsCollections.CoinRepo)
      .map((c) => c.symbol);
    this.form = this.fb.group({
      symbol: [{ value: '', disabled: true }],
      isActive: [''],
      keyLevelName: [{ value: '', disabled: true }],
      price: [{ value: '', disabled: true }],
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
      price: this.data.alert.price,
      description: this.data.alert.description,
      imageLinks: [], // Add the missing form control
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
