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

@Component({
  selector: 'app-coin-black-list-table',
  templateUrl: './coin-black-list-table.component.html',
  styleUrls: ['./coin-black-list-table.component.css'],
})
export class CoinBlackListTableComponent implements OnInit {
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
    this.coinsService.getAllCoins(CoinsCollections.CoinBlackList);
    this.coinsService
      .coins$(CoinsCollections.CoinBlackList)
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
  // Check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length; // Use dataSource.data.length
    return numSelected === numRows;
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
    this.coinsService.deleteMany(CoinsCollections.CoinBlackList, symbols);
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

  onMoveSelectedToCoinTable() {
    const coins = this.selection.selected as Coin[];
    this.coinsService.moveMany(
      CoinsCollections.CoinBlackList,
      CoinsCollections.CoinRepo,
      coins
    );
    this.selection.clear();
    this.buttonsDisabled = true;
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
