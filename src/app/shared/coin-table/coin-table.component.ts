import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TooltipPosition } from '@angular/material/tooltip';

import { Coin } from 'models/coin/coin';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { CoinsCollections } from 'models/coin/coins-collections';
import { EditCoinComponent } from 'src/app/shared/edit-coin/edit-coin.component';
import { Router } from '@angular/router';
import { SANTIMENT_CHARTS } from 'src/consts/url-consts';
import { Subscription } from 'rxjs';
import { CoinDescriptionComponent } from '../coin-description/coin-description.component';
import { CoinUpdateData } from 'models/coin/coin-update-data';

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.css'],
})
export class CoinTableComponent implements OnInit, OnDestroy {
  @Input() collectionName!: string;
  @Input() tableCssClass!: string;
  @Input() tableHeader!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
  coins!: Coin[];
  buttonsDisabled = true;
  filterValue = '';
  isRotating = false;
  CoinsCollections = CoinsCollections;

  searchKeywordFilter = new FormControl();
  tooltipPosition: TooltipPosition = 'above';

  selection = new SelectionModel<any>(true, []);
  constructor(
    private coinService: CoinsGenericService,
    private modalDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.coinService.loadCoins(this.collectionName);
    // Subscribe to the coins data from the service
    this.sub = this.coinService.coins$.subscribe((data) => {
      console.log('Collection Name --> ', this.collectionName);
      this.coins = data.filter((c) => c.collection === this.collectionName);

      this.dataSource = new MatTableDataSource(this.coins);
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
    const numRows = this.dataSource.data.length; // Use dataSource.data.length
    return numSelected === numRows;
  }

  onMoveSelectedToCollection(collectionName: CoinsCollections) {
    const coins = this.selection.selected;
    const currentCoins = this.coinService.getCoins(); // Assuming you have a getter for the coins BehaviorSubject
    const updatedCoins = currentCoins.filter(
      (coin) => !coins.some((selected) => selected.symbol === coin.symbol)
    );

    this.coinService.setCoins(updatedCoins); // Update the BehaviorSubject with the filtered list

    const updateData: Array<CoinUpdateData> = coins.map((c) => {
      return {
        symbol: c.symbol,
        propertiesToUpdate: { collection: collectionName },
      };
    });
    this.coinService.updateMany(updateData, this.collectionName);

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

  onOpenCoinDescription(coin: Coin): void {
    this.modalDialog.open(CoinDescriptionComponent, {
      data: { coin: coin, collectionName: CoinsCollections.CoinRepo },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      width: '100vw',
      height: '100vh',
    });
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
