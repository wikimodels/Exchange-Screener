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
import { CoinsProviderService } from 'src/service/coins/coins-provider.service';
import { EditCoinComponent } from 'src/app/shared/edit-coin/edit-coin.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoinDescriptionComponent } from 'src/app/shared/coin-description/coin-description.component';
import { SANTIMENT_CHARTS } from 'src/consts/url-consts';

@Component({
  selector: 'app-coin-provider-table',
  templateUrl: './coin-provider-table.component.html',
  styleUrls: ['./coin-provider-table.component.css'],
})
export class CoinProviderTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'symbol',
    'category',
    'coinGecko',
    'santiment',
    'status',
    'links',
    'description',
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
    private coinsService: CoinsGenericService,
    private coinsProviderService: CoinsProviderService,
    private modalDialog: MatDialog,
    private router: Router
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

  onOpenCoinDescription(coin: Coin): void {
    this.modalDialog.open(CoinDescriptionComponent, {
      data: { coin: coin, collectionName: CoinsCollections.CoinProvider },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
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
    this.modalDialog.open(EditCoinComponent, {
      data: { coin: coin, collectionName: CoinsCollections.CoinProvider },
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onSantimentClick(coin: Coin) {
    if (!coin || !coin.symbol || !coin.image_url) {
      console.error('Invalid coin or missing symbol or image_url');
      return;
    }

    // Construct the URL with query parameters for symbol and image_url
    const url = this.router.serializeUrl(
      this.router.createUrlTree([SANTIMENT_CHARTS], {
        queryParams: {
          symbol: coin.symbol,
          image_url: coin.image_url,
        },
      })
    );

    console.log(url); // Log the URL for debugging
    window.open(url, '_blank'); // Open the URL in a new tab
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
