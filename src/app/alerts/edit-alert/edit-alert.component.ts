import { Component, Inject, NgZone, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertsService } from 'src/service/alerts.service';
import { CoinsService } from 'src/service/coins.service';
import { KeyLevelNamesService } from 'src/service/key-level-names.service';
import { NewAlertComponent } from '../new-alert/new-alert.component';
import { AlertObj } from 'models/alerts/alert-obj';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { KeyLevelNameValidator } from 'src/functions/validators/key-level-name.validator';
import { SymbolNameValidator } from 'src/functions/validators/symbol-name.validator';
import { symbol } from 'd3-shape';

@Component({
  selector: 'app-edit-alert',
  templateUrl: './edit-alert.component.html',
  styleUrls: ['./edit-alert.component.css'],
})
export class EditAlertComponent {
  constructor(
    private fb: FormBuilder,
    private coinsService: CoinsService,
    private keyLevelNameservice: KeyLevelNamesService,
    public dialogRef: MatDialogRef<EditAlertComponent>,
    private alertService: AlertsService,
    @Inject(MAT_DIALOG_DATA) public data: AlertObj,
    private _ngZone: NgZone
  ) {}

  form!: FormGroup | null;
  symbols!: string[] | null;
  filteredSymbols!: string[] | null;
  validationMessages: { [key: string]: string[] } = {};
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    this.symbols = this.coinsService.Coins.map((c) => c.symbol);
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
    console.log(this.data);
  }

  populateForm() {
    this.imageLinks.clear();
    this.form?.setValue({
      symbol: this.data.symbol,
      isActive: this.data.isActive,
      action: this.data.action,
      keyLevelName: this.data.keyLevelName,
      price: this.data.price,
      description: this.data.description,
      imageLinks: [], // Add the missing form control
    });
    // Populate the FormArray for imageLinks
    this.data.imgUrls?.forEach((url: string) => {
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

  preventEKey(event: KeyboardEvent): void {
    if (event.key === 'e' || event.key === 'E') {
      event.preventDefault(); // Prevent default behavior of the 'e' key
    }
  }
  // Method to filter the symbol list based on user input
  filterSymbols(): void {
    let inputValue = '';
    if (this.form) {
      inputValue = this.form.get('symbol')?.value.toLowerCase() || '';
    }
    if (this.symbols) {
      this.filteredSymbols = this.symbols.filter((symbol) =>
        symbol.toLowerCase().includes(inputValue)
      );
    }
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
      this.alertService.createAlert(this.form.value).subscribe();
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
