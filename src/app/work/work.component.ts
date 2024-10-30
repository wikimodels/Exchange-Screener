import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Coin } from 'models/shared/coin';
import { SnackbarType } from 'models/shared/snackbar-type';
import { Subscription } from 'rxjs';
import { CoinsService } from 'src/service/coins/coins.service';
import { WorkingCoinsService } from 'src/service/coins/working-coins.service';
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
    private workingCoinsService: WorkingCoinsService,
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

    this.workingCoinsSub = this.workingCoinsService.workingCoins$.subscribe(
      (data: Coin[]) => {
        this.workingCoins = data;
        this.selectionService.clear();
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
        this.workingCoinsService.addWorkingCoins(this.workingCoins).subscribe();
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
    this.workingCoinsService
      .deleteWorkingCoinsBatch(this.selectionService.selectedValues())
      .subscribe();
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
