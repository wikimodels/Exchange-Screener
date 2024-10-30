import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertObj } from 'models/alerts/alert-obj';

import { DescriptionModalComponent } from '../../shared/description-modal/description-modal.component';
import { EditAlertComponent } from 'src/app/alerts/edit-alert/edit-alert.component';
import { TriggeredAlertsService } from 'src/service/alerts/triggered-alerts.service';

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
  selection = new SelectionModel<any>(true, []); // Allows multiple selections
  constructor(
    private triggeredAlertsService: TriggeredAlertsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.triggeredAlertsService.getAllTriggeredAlerts().subscribe((data) => {});
    this.triggeredAlertsService.alertsTriggered$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  refreshDataTable() {
    this.triggeredAlertsService.getAllTriggeredAlerts().subscribe((data) => {});
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
  // Check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length; // Use dataSource.data.length
    return numSelected === numRows;
  }

  onOpenDescriptionModalDialog(obj: AlertObj): void {
    this.matDialog.open(DescriptionModalComponent, {
      data: obj,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }

  onEdit(alertObj: AlertObj) {
    this.matDialog.open(EditAlertComponent, {
      data: alertObj,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onDeleteSelected() {
    const objs = this.selection.selected;
    this.triggeredAlertsService
      .deleteTriggeredAlertsButch(objs)
      .subscribe((data: any) => {
        this.selection.clear();
      });
    this.deleteDisabled = true;
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
