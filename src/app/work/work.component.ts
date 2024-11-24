import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Coin } from 'models/coin/coin';
import { CoinUpdateData } from 'models/coin/coin-update-data';
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
  count = 0;
  coins!: Coin[];
  coinsAtWork!: Coin[];
  symbols!: string[];
  form!: FormGroup | null;
  filteredSymbols: string[] = [];
  sub!: Subscription | null;
  defaultLink = 'https://www.tradingview.com/chart?symbol=BINANCE:BTCUSDT.P';
  private openedWindows: Window[] = [];

  constructor(
    private coinsService: CoinsGenericService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    public selectionService: WorkSelectionService<any>
  ) {}

  ngOnInit(): void {
    this.coinsService.loadCoins(CoinsCollections.CoinRepo);
    this.sub = this.coinsService.coins$.subscribe((data: Coin[]) => {
      this.coins = data;
      this.symbols = data.map((d) => d.symbol);
      this.coinsAtWork = data.filter((c) => c.isAtWork);
      this.count = this.coinsAtWork.length;
      this.selectionService.clear();
      console.log('symbols', this.symbols.length);
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

  onPutToWork() {
    if (this.form?.valid) {
      const symbol = this.form.get('symbol')?.value;
      const coin = this.coins.find((c) => c.symbol == symbol);

      const alreadyAdded = this.coinsAtWork.find(
        (c) => coin?.symbol == c.symbol
      );
      if (coin && !alreadyAdded) {
        const updateData: CoinUpdateData = {
          symbol: coin.symbol,
          propertiesToUpdate: {
            isAtWork: true,
          },
        };
        this.coinsService.updateOne(updateData);
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
    if (this.selectionService.isAllSelected(this.coinsAtWork)) {
      this.selectionService.clear();
    } else {
      this.selectionService.select(this.coinsAtWork);
    }
  }

  isAllSelected() {
    return this.selectionService.isAllSelected(this.coinsAtWork);
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

  onRemoveFromWork() {
    const coins = this.selectionService.selectedValues() as Coin[];

    const currentCoins = this.coinsService.getCoins(); // Assuming you have a getter for the coins BehaviorSubject
    const updatedCoins = currentCoins.filter(
      (coin) => !coins.some((selected) => selected.symbol === coin.symbol)
    );

    this.coinsService.setCoins(updatedCoins); // Update the BehaviorSubject with the filtered list
    const updateData: Array<CoinUpdateData> = coins.map((c) => {
      return {
        symbol: c.symbol,
        propertiesToUpdate: { isAtWork: false },
      };
    });
    this.coinsService.updateMany(updateData);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
