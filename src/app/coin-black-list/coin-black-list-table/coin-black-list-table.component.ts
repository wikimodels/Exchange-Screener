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
  selector: 'app-coin-black-list-table',
  templateUrl: './coin-black-list-table.component.html',
  styleUrls: ['./coin-black-list-table.component.css'],
})
export class CoinBlackListTableComponent implements OnInit {
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  tooltipPosition: TooltipPosition = 'above';

  selection = new SelectionModel<any>(true, []);
  constructor(
    private coinBlackLisdtService: BlackListCoinsService,
    private modelDialog: MatDialog
  ) {}

  ngOnInit() {
    this.coinBlackLisdtService.getCoinsBlackList().subscribe();
    this.coinBlackLisdtService.coinsProviderBlackList$.subscribe((data) => {
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

  onMoveSelectedToBlackList() {}

  onMoveSelectedToCoinColl() {
    // const objs = this.selection.selected;
    // console.log('SELECTED COINS --> ', objs);
    // this.coinProviderService.relocateToCoins(objs).subscribe((data: any) => {
    //   this.selection.clear();
    // });
    // this.deleteDisabled = true;
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
    this.coinBlackLisdtService
      .deleteCoinArrayFromBlackList(objs)
      .subscribe((data: any) => {
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
    //this.coinProviderService.relocateToCoins(coins).subscribe();
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
