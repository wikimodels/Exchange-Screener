import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DescriptionModalComponent } from '../../shared/description-modal/description-modal.component';

import { AlertsGenericService } from 'src/service/alerts/alerts-generic.service';
import { AlertsCollections } from 'models/alerts/alerts-collections';
import { Alert } from 'models/alerts/alert';
import { EditAlertComponent } from 'src/app/shared/edit-alert/edit-alert.component';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { CoinsCollections } from 'models/coin/coins-collections';
import { SnackbarService } from 'src/service/snackbar.service';
import { SnackbarType } from 'models/shared/snackbar-type';

/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-triggered-alerts-table',
  templateUrl: './triggered-alerts-table.component.html',
  styleUrls: ['./triggered-alerts-table.component.css'],
})
export class TriggeredAlertsTableComponent implements OnInit {
  displayedColumns: string[] = [
    'symbol',
    'alertName',
    'action',
    'activationTimeStr',
    'links',
    'description',
    'edit',
    'select',
  ];

  filterValue = '';
  dataSource!: any;
  buttonsDisabled = true;
  isRotating = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  selection = new SelectionModel<any>(true, []);
  constructor(
    private alertsService: AlertsGenericService,
    private coinsService: CoinsGenericService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.alertsService
      .alerts$(AlertsCollections.TriggeredAlerts)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  refreshDataTable() {
    this.alertsService.getAllAlerts(AlertsCollections.TriggeredAlerts);
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
    }, 1000);
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length; // Use dataSource.data.length
    return numSelected === numRows;
  }

  onOpenDescriptionModalDialog(alert: Alert): void {
    this.matDialog.open(DescriptionModalComponent, {
      data: alert,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }

  onEdit(alert: Alert) {
    this.matDialog.open(EditAlertComponent, {
      data: { collectionName: AlertsCollections.TriggeredAlerts, alert: alert },
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onDeleteSelected() {
    const alerts = this.selection.selected as Alert[];
    const ids = alerts.map((a) => a.id);
    this.alertsService.deleteMany(AlertsCollections.TriggeredAlerts, ids);
    this.selection.clear();
    this.buttonsDisabled = true;
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  onMoveToWorkingCoins() {
    const selectedAlerts = this.selection.selected as Alert[];
    const selectedSymbols = selectedAlerts.map((a) => a.symbol);

    // Get all coins from the CoinRepo collection
    const coins = this.coinsService.getCoins(CoinsCollections.CoinRepo);

    // Filter out coins that match the selected symbols
    let selectedCoins = coins.filter((coin) =>
      selectedSymbols.includes(coin.symbol)
    );

    // Get coins that are already in CoinAtWork
    const coinsAtWork = this.coinsService.getCoins(CoinsCollections.CoinAtWork);

    // Filter out any coins from selectedCoins that are already in CoinAtWork
    selectedCoins = selectedCoins.filter(
      (coin) =>
        !coinsAtWork.some((coinAtWork) => coinAtWork.symbol === coin.symbol)
    );

    // Remove duplicates in selectedCoins based on the symbol
    selectedCoins = selectedCoins.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.symbol === value.symbol)
    );

    // Check if there are no new coins to add
    if (selectedCoins.length === 0) {
      this.snackbarService.showSnackBar(
        'Some Coins already there',
        '',
        3000,
        SnackbarType.Warning
      );
    } else {
      console.log(selectedCoins);
      this.coinsService.addMany(CoinsCollections.CoinAtWork, selectedCoins);
    }
    this.selection.clear();
    this.buttonsDisabled = true;
  }
}
