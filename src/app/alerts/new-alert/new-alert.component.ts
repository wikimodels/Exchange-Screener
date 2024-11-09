import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertNameValidator } from 'src/functions/validators/alert-name.validator';
import { MatDialogRef } from '@angular/material/dialog';
import { SymbolNameValidator } from 'src/functions/validators/symbol-name.validator';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subscription, take } from 'rxjs';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { CoinsCollections } from 'models/coin/coins-collections';
import { AlertsGenericService } from 'src/service/alerts/alerts-generic.service';
import { AlertsCollections } from 'models/alerts/alerts-collections';
import { Coin } from 'models/coin/coin';
import { Alert } from 'models/alerts/alert';
import { Exchange } from 'models/shared/exchange';
import { Status } from 'models/coin/status';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.css'],
  providers: [],
})
export class NewAlertComponent implements OnInit, OnDestroy {
  validationMessages: { [key: string]: string[] } = {};
  filteredSymbols!: string[];
  sub!: Subscription;
  symbols!: string[];
  form!: FormGroup;
  coins!: Coin[];
  logoUrl = 'assets/img/noname.png';
  displayedSymol = 'New Alert';

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    this.sub = this.coinsService
      .coins$(CoinsCollections.CoinRepo)
      .subscribe((coins: Coin[]) => {
        this.coins = coins;
        this.symbols = coins.map((c) => c.symbol);
      });
    this.form = this.fb.group({
      symbol: [
        '',
        Validators.compose([Validators.required]),
        Validators.composeAsync([
          SymbolNameValidator.createValidator(this.coinsService),
        ]),
      ],
      alertName: [
        '',
        Validators.compose([Validators.required]),
        Validators.composeAsync([
          AlertNameValidator.createValidator(this.alertsService),
        ]),
      ],
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^-?\\d*(\\.\\d+)?$'),
        ]),
      ],
      isActive: [true],
      action: ['', Validators.required],
      description: ['', Validators.required],
      tvImgUrls: this.fb.array([this.createImageUrlControl()]),
    });

    this.form.get('symbol')?.valueChanges.subscribe((value: string) => {
      const coins = this.coins.find((c) => c.symbol == value);
      this.logoUrl = coins?.image_url ? coins?.image_url : this.logoUrl;
      this.displayedSymol = coins?.symbol
        ? coins?.symbol + ' ALERT'
        : this.displayedSymol;
    });
  }

  constructor(
    private fb: FormBuilder,
    private coinsService: CoinsGenericService,
    public dialogRef: MatDialogRef<NewAlertComponent>,
    private alertsService: AlertsGenericService,
    private _ngZone: NgZone
  ) {}

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
    return this.form?.get('tvImgUrls') as FormArray;
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
      const alert: Alert = this.form.value;
      const coin = this.coins.find((c) => c.symbol == alert.symbol);
      alert.description = this.form.get('description')?.value;
      alert.tvImgUrls = this.form.get('tvImgUrls')?.value;
      alert.alertName = this.form.get('alertName')?.value;
      alert.action = this.form.get('action')?.value;
      alert.price = this.form.get('price')?.value;
      alert.isActive = this.form.get('isActive')?.value;
      alert.isTv = false;
      alert.binanceExch = coin?.binanceExch;
      alert.bybitExch = coin?.bybitExch;
      alert.tvLink = coin?.tvLink;
      alert.cgLink = coin?.cgLink;
      alert.category = coin?.category;
      alert.exchange = coin?.exchange as Exchange;
      alert.status = coin?.status as Status;
      alert.coinExchange = coin?.coinExchange;
      alert.image_url = coin?.image_url;
      alert.creationTime = new Date().getTime();
      console.log(alert);
      console.log('COIN ---> ', coin);
      this.alertsService.addOne(AlertsCollections.WorkingAlerts, alert);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
