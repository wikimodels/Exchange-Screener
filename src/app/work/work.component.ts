import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Coin } from 'models/shared/coin';
import { SnackbarType } from 'models/shared/snackbar-type';
import { Subscription } from 'rxjs';
import { CoinsService } from 'src/service/coins.service';
import { SnackbarService } from 'src/service/snackbar.service';
import { WorkSelectionService } from 'src/service/work.selection.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
})
export class WorkComponent implements OnInit, OnDestroy {
  coins!: Coin[];
  workingCoins!: Coin[];
  symbols!: string[];
  form!: FormGroup | null;
  filteredSymbols: string[] = [];
  coinsSub!: Subscription | null;
  workingCoinsSub!: Subscription | null;
  deleteDisabled = true;
  selectedItems$ = this.selectionService.selectionChanges$;

  constructor(
    private coinsService: CoinsService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    public selectionService: WorkSelectionService<any>
  ) {}

  ngOnInit(): void {
    this.coinsSub = this.coinsService.coins$.subscribe((data: Coin[]) => {
      this.coins = data;
      this.symbols = data.map((d) => d.symbol);
    });

    this.workingCoinsSub = this.coinsService.workingCoins$.subscribe(
      (data: Coin[]) => {
        this.workingCoins = data;
      }
    );

    this.form = this.fb.group({
      symbol: [''],
    });
  }

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

  addWorkingSymbol() {
    if (this.form?.valid) {
      const symbol = this.form.get('symbol')?.value;
      const coin = this.coins.find((c) => c.symbol == symbol);

      const alreadyAdded = this.workingCoins.find(
        (c) => coin?.symbol == c.symbol
      );
      if (coin && !alreadyAdded) {
        this.workingCoins.push(coin);
        this.coinsService.addWorkingCoins(this.workingCoins).subscribe();
      }
      if (coin && alreadyAdded) {
        this.snackbarService.showSnackBar(
          'Coin already in List',
          '',
          3000,
          SnackbarType.Warning
        );
      }
    }
    this.form?.reset();
    this.form?.markAsPristine();
  }

  clearInput() {
    this.filteredSymbols = [];
    this.form?.reset();
    this.form?.markAsPristine();
  }

  toggleAll() {
    if (this.selectionService.isAllSelected(this.workingCoins)) {
      this.selectionService.clear();
      this.deleteDisabled = true;
    } else {
      this.selectionService.select(this.workingCoins);
      this.deleteDisabled = false;
    }
  }

  onDelete() {
    this.coinsService.deleteAllWorkingCoins().subscribe();
  }

  ngOnDestroy(): void {
    if (this.coinsSub) {
      this.coinsSub.unsubscribe();
    }
    if (this.workingCoinsSub) {
      this.workingCoinsSub.unsubscribe();
    }
  }
}