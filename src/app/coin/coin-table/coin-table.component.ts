import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { EditCoinComponent } from 'src/app/shared/edit-coin/edit-coin.component';
import { Router } from '@angular/router';
import { SANTIMENT } from 'src/consts/url-consts';
import { Subscription } from 'rxjs';
import { CoinDescriptionComponent } from '../../shared/coin-description/coin-description.component';

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.css'],
})
export class CoinTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'symbol',
    'category',
    'coinGecko',
    'santiment',
    'status',
    'links',
    'description',
    'edit',
    'select',
  ];
  sub!: Subscription | null;
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
    private coinService: CoinsGenericService,
    private modalDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.coinService.getAllCoins(CoinsCollections.CoinRepo);
    this.sub = this.coinService
      .coins$(CoinsCollections.CoinRepo)
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
    const coins = this.selection.selected;
    this.coinService.moveMany(
      CoinsCollections.CoinRepo,
      CoinsCollections.CoinBlackList,
      coins
    );
    this.selection.clear();
    this.buttonsDisabled = true;
  }

  onOpenCoinDescription(coin: Coin): void {
    this.modalDialog.open(CoinDescriptionComponent, {
      data: { coin: coin, collectionName: CoinsCollections.CoinRepo },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      width: '100vw',
      height: '100vh',
    });
  }

  onMoveSelectedToSorterTable() {
    const coins = this.selection.selected as Coin[];
    this.coinService.moveMany(
      CoinsCollections.CoinRepo,
      CoinsCollections.CoinSorter,
      coins
    );
    this.selection.clear();
    this.buttonsDisabled = true;
  }

  onEdit(coin: Coin) {
    console.log('CoinTable ---> ', coin);
    this.modalDialog.open(EditCoinComponent, {
      data: { coin: coin, collectionName: CoinsCollections.CoinRepo },
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onSantimentClick(coin: Coin) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([
        SANTIMENT,
        coin.symbol,
        coin.slug,
        coin.image_url,
      ])
    );
    console.log(url);
    window.open(url, '_blank');
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
