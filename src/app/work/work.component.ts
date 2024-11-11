import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Coin } from 'models/coin/coin';
import { CoinsCollections } from 'models/coin/coins-collections';
import { SnackbarType } from 'models/shared/snackbar-type';
import { Subscription } from 'rxjs';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';

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
  defaultLink = 'https://www.tradingview.com/chart?symbol=BINANCE:BTCUSDT.P';
  private openedWindows: Window[] = [];

  constructor(
    private coinsService: CoinsGenericService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    public selectionService: WorkSelectionService<any>
  ) {}

  ngOnInit(): void {
    this.coinsService.getAllCoins(CoinsCollections.CoinRepo);
    this.coinsSub = this.coinsService
      .coins$(CoinsCollections.CoinRepo)
      .subscribe((data: Coin[]) => {
        this.coins = data;
        this.symbols = data.map((d) => d.symbol);
      });

    this.workingCoinsSub = this.coinsService
      .coins$(CoinsCollections.CoinAtWork)
      .subscribe((data: Coin[]) => {
        this.workingCoins = data;
        this.selectionService.clear();
      });

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

  onMoveToWorkingCoinsTable() {
    if (this.form?.valid) {
      const symbol = this.form.get('symbol')?.value;
      const coin = this.coins.find((c) => c.symbol == symbol);

      const alreadyAdded = this.workingCoins.find(
        (c) => coin?.symbol == c.symbol
      );
      if (coin && !alreadyAdded) {
        this.coinsService.addOne(CoinsCollections.CoinAtWork, coin);
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
    } else {
      this.selectionService.select(this.workingCoins);
    }
  }

  isAllSelected() {
    return this.selectionService.isAllSelected(this.workingCoins);
  }

  onOpenCoinglass() {
    this.selectionService.selectedValues().forEach((v: Coin, index: number) => {
      setTimeout(() => {
        const newWindow = window.open(v.cgLink, '_blank');
        if (newWindow) {
          this.openedWindows.push(newWindow);
        }
      }, index * 1500);
    });
  }

  onOpenTradingview() {
    this.selectionService.selectedValues().forEach((v: Coin, index: number) => {
      setTimeout(() => {
        const newWindow = window.open(v.tvLink, '_blank');
        if (newWindow) {
          this.openedWindows.push(newWindow);
        }
      }, index * 1500);
    });
  }

  onOpenSingleTradingview() {
    const newWindow = window.open(this.defaultLink, '_blank');
    if (newWindow) {
      this.openedWindows.push(newWindow);
    }
  }

  onCloseAllWindows() {
    this.openedWindows.forEach((win) => win.close());
    this.openedWindows = [];
  }

  onDelete() {
    const coins = this.selectionService.selectedValues() as Coin[];
    const symbols = coins.map((c) => c.symbol);
    this.coinsService.deleteMany(CoinsCollections.CoinAtWork, symbols);
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
