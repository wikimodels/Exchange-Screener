import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeyLevelNamesService } from 'src/service/key-level-names.service';
import { KeyLevelNameValidator } from 'src/functions/validators/key-level-name.validator';
import { AlertsService } from 'src/service/alerts/alerts.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SymbolNameValidator } from 'src/functions/validators/symbol-name.validator';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { CoinsCollections } from 'models/coin/coins-collections';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.css'],
  providers: [],
})
export class NewAlertComponent implements OnInit {
  form!: FormGroup | null;
  symbols!: string[] | null;
  filteredSymbols!: string[] | null;
  validationMessages: { [key: string]: string[] } = {};
  constructor(
    private fb: FormBuilder,
    private coinsService: CoinsGenericService,
    private keyLevelNameService: KeyLevelNamesService,
    public dialogRef: MatDialogRef<NewAlertComponent>,
    private alertService: AlertsService,
    private _ngZone: NgZone
  ) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    this.symbols = this.coinsService
      .getCoins(CoinsCollections.CoinRepo)
      .map((c) => c.symbol);
    this.form = this.fb.group({
      symbol: [
        '',
        Validators.compose([Validators.required]),
        Validators.composeAsync([
          SymbolNameValidator.createValidator(this.coinsService),
        ]),
      ],
      keyLevelName: [
        '',
        Validators.compose([Validators.required]),
        Validators.composeAsync([
          KeyLevelNameValidator.createValidator(this.keyLevelNameService),
        ]),
      ],
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^-?\\d*(\\.\\d+)?$'),
        ]),
      ],
      isTv: [false],
      action: ['', Validators.required],
      description: ['', Validators.required],
      imgUrls: this.fb.array([this.createImageUrlControl()]),
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  // Create a FormControl with URL validator
  createImageUrlControl() {
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

  get imgUrls() {
    return this.form?.get('imgUrls') as FormArray;
  }

  addLink() {
    this.imgUrls.push(this.createImageUrlControl());
  }

  removeLink(index: number) {
    if (this.imgUrls.length > 1) {
      this.imgUrls.removeAt(index);
    }
  }

  onSubmit() {
    this.form?.markAllAsTouched();
    this.form?.markAsDirty();
    this.form?.updateValueAndValidity();
    this.imgUrls.controls.forEach((c) => {
      c.markAllAsTouched();
      c.markAsDirty();
      c.updateValueAndValidity();
    });

    if (this.form?.valid) {
      this.alertService.createAlert(this.form.value).subscribe();
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
