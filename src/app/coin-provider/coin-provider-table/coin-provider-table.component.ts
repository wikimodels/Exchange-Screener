import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DescriptionModalComponent } from 'src/app/shared/description-modal/description-modal.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { CoinsProviderService } from 'src/service/coins/coins-provider.service';
import { Coin } from 'models/shared/coin';
import { CoinComponent } from 'src/app/coin/coin.component';
import { BlackListCoinsService } from 'src/service/coins/black-list-coins.service';

@Component({
  selector: 'app-coin-provider-table',
  templateUrl: './coin-provider-table.component.html',
  styleUrls: ['./coin-provider-table.component.css'],
})
export class CoinProviderTableComponent implements OnInit {
  displayedColumns: string[] = [
    'symbol',
    'category',
    'coinGeckoMissing',
    'santimentMissing',
    'links',
    'select',
  ];

  dataSource!: any;
  deleteDisabled = true;
  filterValue = '';
  isRotating = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  tooltipPosition: TooltipPosition = 'above';

  selection = new SelectionModel<any>(true, []);
  constructor(
    private coinProviderService: CoinsProviderService,
    private coinBlackListService: BlackListCoinsService,
    private modelDialog: MatDialog
  ) {}

  ngOnInit() {
    this.coinProviderService.getAllCoins().subscribe();
    this.coinProviderService.coinsProvider$.subscribe((data) => {
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
    this.deleteDisabled = this.selection.selected.length > 0 ? false : true;
  }
  // Toggle "Select All" checkbox
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.deleteDisabled = true;
    } else {
      this.selection.select(...this.dataSource.data);
      this.deleteDisabled = false;
    }
  }
  // Check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length; // Use dataSource.data.length
    return numSelected === numRows;
  }

  onMoveSelectedToBlackList() {
    const objs = this.selection.selected;
    console.log('SELECTED COINS --> ', objs);
    this.coinBlackListService
      .addCoinArrayToBlackList(objs)
      .subscribe((data: any) => {
        this.selection.clear();
        this.coinProviderService.getAllCoins().subscribe();
      });
    this.deleteDisabled = true;
  }

  onRunRefreshmentProcedure() {
    this.isRotating = true;
    this.coinProviderService
      .runRefreshmentProcedure()
      .subscribe((data: { finish: boolean }) => {
        console.log(data);
        this.isRotating = false;
      });
  }
  onMoveSelectedToCoinColl() {
    const objs = this.selection.selected;
    console.log('SELECTED COINS --> ', objs);
    this.coinProviderService.relocateToCoins(objs).subscribe((data: any) => {
      this.selection.clear();
    });
    this.deleteDisabled = true;
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
    const objs = this.selection.selected;
    this.coinProviderService.deleteCoinArray(objs).subscribe((data: any) => {
      this.selection.clear();
    });
    this.deleteDisabled = true;
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
    this.coinProviderService.relocateToCoins(coins).subscribe();
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
