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
    'keyLevelName',
    'action',
    'activationTimeStr',
    'links',
    'edit',
    'description',
    'select',
  ];

  filterValue = '';
  dataSource!: any;
  deleteDisabled = true;
  isRotating = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  selection = new SelectionModel<any>(true, []);
  constructor(
    private alertsService: AlertsGenericService,
    private matDialog: MatDialog
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
    this.alertsService.getAlerts(AlertsCollections.TriggeredAlerts);
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
    this.deleteDisabled = true;
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
