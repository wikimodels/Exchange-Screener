import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { AlertObj } from 'models/alerts/alert-obj';
import { EditAlertComponent } from 'src/app/alerts/edit-alert/edit-alert.component';
import { DescriptionModalComponent } from 'src/app/shared/description-modal/description-modal.component';
import { AlertsService } from 'src/service/alerts/alerts.service';
import { CoinsService } from 'src/service/coins/coins.service';
import { Subscription } from 'rxjs';
import { AddCoinComponent } from '../add-coin/add-coin.component';
import { Coin } from 'models/shared/coin';
import { EditCoinComponent } from '../edit-coin/edit-coin.component';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.css'],
})
export class CoinTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'symbol',
    'category',
    'links',
    'edit',
    'delete',
  ];

  sub!: Subscription;
  dataSource!: any;
  deleteDisabled = true;
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  tooltipPosition: TooltipPosition = 'above';

  constructor(
    private coinsService: CoinsService,
    private modelDialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.coinsService.getAllCoins().subscribe();
    this.coinsService.coins$.subscribe((data: Coin[]) => {
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

  onOpenDescriptionModalDialog(alertObj: AlertObj): void {
    this.modelDialog.open(DescriptionModalComponent, {
      data: alertObj,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }

  onAdd() {
    this.modelDialog.open(AddCoinComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onEdit(coin: Coin) {
    this.modelDialog.open(EditCoinComponent, {
      data: coin,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onDelete(coin: Coin) {
    this.modelDialog.open(DeleteItemComponent, {
      data: coin,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
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
