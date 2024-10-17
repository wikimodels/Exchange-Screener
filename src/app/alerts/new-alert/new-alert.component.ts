import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoinsService } from 'service/coins.service';
import { KeyLevelNamesService } from 'service/key-level-names.service';
import { KeyLevelNameValidator } from 'validators/key-level-name.validator';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.css'],
  providers: [],
})
export class NewAlertComponent implements OnInit {
  form: FormGroup | null = null;
  symbols: string[] | null = null;
  filteredSymbols: string[] | null = null;
  constructor(
    private fb: FormBuilder,
    private coinsService: CoinsService,
    private service: KeyLevelNamesService
  ) {}
  ngOnInit(): void {
    this.symbols = this.coinsService.Coins.map((c) => c.symbol);
    this.form = this.fb.group({
      symbol: ['', Validators.required],
      keyLevelName: [
        '',
        Validators.compose([Validators.required]),
        Validators.composeAsync([
          KeyLevelNameValidator.createValidator(this.service),
        ]),
      ],
      action: ['', Validators.required],
      description: ['', Validators.required],
      mainImgUrl: ['', Validators.required],
    });
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

  onSubmit() {
    console.log(this.form);
  }
  cancel() {}
}
