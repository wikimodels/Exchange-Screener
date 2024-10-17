import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoinsService } from 'src/services/coins.service';
import { KeyLevelNamesService } from 'src/services/key-level-names.service';
import { KeyLevelNameValidator } from 'src/functions/validators/key-level-name.validator';
import { AlertsService } from 'src/services/alerts.service';
import { MatDialogRef } from '@angular/material/dialog';

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
    private keyLevelNameservice: KeyLevelNamesService,
    private alertService: AlertsService,
    public dialogRef: MatDialogRef<NewAlertComponent>
  ) {}
  ngOnInit(): void {
    this.symbols = this.coinsService.Coins.map((c) => c.symbol);
    this.form = this.fb.group({
      symbol: ['', Validators.required],
      keyLevelName: [
        '',
        Validators.compose([Validators.required]),
        Validators.composeAsync([
          KeyLevelNameValidator.createValidator(this.keyLevelNameservice),
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
    if (this.form?.valid) {
      const alert = this.form.value;
      this.alertService.createAlert(alert).subscribe((data) => {
        this.dialogRef.close();
      });
    }
  }
  cancel() {
    this.dialogRef.close;
  }
}
