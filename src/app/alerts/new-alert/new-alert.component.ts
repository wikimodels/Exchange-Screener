import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CoinsService } from 'src/service/coins.service';
import { KeyLevelNamesService } from 'src/service/key-level-names.service';
import { KeyLevelNameValidator } from 'src/functions/validators/key-level-name.validator';
import { AlertsService } from 'src/service/alerts.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SymbolNameValidator } from 'src/functions/validators/symbol-name.validator';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';

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
    private coinsService: CoinsService,
    private keyLevelNameservice: KeyLevelNamesService,
    public dialogRef: MatDialogRef<NewAlertComponent>,
    private alertService: AlertsService,
    private _ngZone: NgZone
  ) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    this.symbols = this.coinsService.Coins.map((c) => c.symbol);
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
          KeyLevelNameValidator.createValidator(this.keyLevelNameservice),
        ]),
      ],
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^-?\\d*(\\.\\d+)?$'),
        ]),
      ],
      action: ['', Validators.required],
      description: ['', Validators.required],
      imageLinks: this.fb.array([this.createImageLinkControl()]),
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
