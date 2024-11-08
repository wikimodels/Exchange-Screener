import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DescriptionModalComponent } from 'src/app/shared/description-modal/description-modal.component';
import { TooltipPosition } from '@angular/material/tooltip';

import { Coin } from 'models/coin/coin';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { CoinsCollections } from 'models/coin/coins-collections';
import { TvListComponent } from 'src/app/shared/tv-list/tv-list.component';
import { EditCoinComponent } from 'src/app/shared/edit-coin/edit-coin.component';

@Component({
  selector: 'app-coin-sorter-table',
  templateUrl: './coin-sorter-table.component.html',
  styleUrls: ['./coin-sorter-table.component.css'],
})
export class CoinSorterTableComponent implements OnInit {
  displayedColumns: string[] = [
    'symbol',
    'category',
    'coinGecko',
    'santiment',
    'status',
    'links',
    'select',
  ];

  dataSource!: any;
  buttonsDisabled = true;
  filterValue = '';
  bybitCoinsList = '';
  binanceCoinsList = '';
  isRotating = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  tooltipPosition: TooltipPosition = 'above';

  selection = new SelectionModel<any>(true, []);
  constructor(
    private coinsService: CoinsGenericService,
    private modelDialog: MatDialog
  ) {}

  ngOnInit() {
    this.coinsService.getAllCoins(CoinsCollections.CoinSorter);
    this.coinsService.coins$(CoinsCollections.CoinSorter).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Filter function
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDataToggled(data: any) {
    this.selection.toggle(data);
    this.buttonsDisabled = this.selection.selected.length > 0 ? false : true;
  }
  // Toggle "Select All" checkbox
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.buttonsDisabled = true;
    } else {
      this.selection.select(...this.dataSource.data);
      this.buttonsDisabled = false;
    }
  }
  // Check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length; // Use dataSource.data.length
    return numSelected === numRows;
  }

  onMoveSelectedToBlackListTable() {
    const coins = this.selection.selected as Coin[];

    this.coinsService.moveMany(
      CoinsCollections.CoinProvider,
      CoinsCollections.CoinBlackList,
      coins
    );

    this.selection.clear();
    this.buttonsDisabled = true;
  }

  onMoveSelectedToCoinTable() {
    const coins = this.selection.selected as Coin[];
    this.coinsService.moveMany(
      CoinsCollections.CoinSorter,
      CoinsCollections.CoinRepo,
      coins
    );
    this.selection.clear();

    this.buttonsDisabled = true;
  }

  onOpenDescriptionModalDialog(coin: Coin): void {
    this.modelDialog.open(DescriptionModalComponent, {
      data: coin,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }

  onEdit(coin: Coin) {
    this.modelDialog.open(EditCoinComponent, {
      data: { coin: coin, collectionName: CoinsCollections.CoinRepo },
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onCreateTvLists() {
    const coins = this.selection.selected as Coin[];
    this.bybitCoinsList = coins
      .filter((c) => c.coinExchange === 'by' || c.coinExchange === 'biby')
      .map((c) => `BYBIT:${c.symbol}USDT`)
      .join(',');

    // Filter and map Binance coins
    this.binanceCoinsList = coins
      .filter((c) => c.coinExchange === 'bi')
      .map((c) => `BINANCE:${c.symbol}USDT`)
      .join(',');

    this.modelDialog.open(TvListComponent, {
      data: {
        bybitList: this.bybitCoinsList,
        binaniceList: this.binanceCoinsList,
      },
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
