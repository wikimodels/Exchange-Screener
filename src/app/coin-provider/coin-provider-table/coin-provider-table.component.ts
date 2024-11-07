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
import { CoinComponent } from 'src/app/coin/coin.component';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { CoinsCollections } from 'models/coin/coins-collections';
import { CoinsProviderService } from 'src/service/coins/coins-provider.service';

@Component({
  selector: 'app-coin-provider-table',
  templateUrl: './coin-provider-table.component.html',
  styleUrls: ['./coin-provider-table.component.css'],
})
export class CoinProviderTableComponent implements OnInit {
  displayedColumns: string[] = [
    'symbol',
    'category',
    'coinGecko',
    'santiment',
    'links',
    'select',
  ];

  dataSource!: any;
  buttonsDisabled = true;
  filterValue = '';
  isRotating = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  tooltipPosition: TooltipPosition = 'above';

  selection = new SelectionModel<any>(true, []);
  constructor(
    private coinsService: CoinsGenericService,
    private coinsProviderService: CoinsProviderService,
    private modelDialog: MatDialog
  ) {}

  ngOnInit() {
    this.coinsService.getAllCoins(CoinsCollections.CoinProvider);
    this.coinsService
      .coins$(CoinsCollections.CoinProvider)
      .subscribe((data) => {
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

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.buttonsDisabled = true;
    } else {
      this.selection.select(...this.dataSource.data);
      this.buttonsDisabled = false;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
      CoinsCollections.CoinProvider,
      CoinsCollections.CoinRepo,
      coins
    );
    this.selection.clear();

    this.buttonsDisabled = true;
  }

  onMoveSelectedToSorterTable() {
    const coins = this.selection.selected as Coin[];
    this.coinsService.moveMany(
      CoinsCollections.CoinProvider,
      CoinsCollections.CoinSorter,
      coins
    );
    this.selection.clear();

    this.buttonsDisabled = true;
  }

  onRunRefreshmentProcedure() {
    this.isRotating = true;
    this.coinsProviderService
      .runRefreshmentProcedure()
      .subscribe((data: { finish: boolean }) => {
        this.coinsService.getAllCoins(CoinsCollections.CoinProvider);
        this.isRotating = false;
      });
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

  onDeleteSelected() {
    const coins = this.selection.selected as Coin[];
    const symbols = coins.map((c) => c.symbol);
    this.coinsService.deleteMany(CoinsCollections.CoinProvider, symbols);
    this.selection.clear();
    this.buttonsDisabled = true;
  }

  onEdit(coin: Coin) {
    this.modelDialog.open(CoinComponent, {
      data: coin,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onMoveToCoins(coins: Coin[]) {
    //this.coinProviderService.relocateToCoins(coins).subscribe();
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
