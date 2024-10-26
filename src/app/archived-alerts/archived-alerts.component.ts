import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { AlertObj } from 'models/alerts/alert-obj';
import { AlertsService } from 'src/service/alerts.service';
import { EditAlertComponent } from '../alerts/edit-alert/edit-alert.component';
import { NewAlertComponent } from '../alerts/new-alert/new-alert.component';
import { DescriptionModalComponent } from '../description-modal/description-modal.component';

@Component({
  selector: 'app-archived-alerts',
  templateUrl: './archived-alerts.component.html',
  styleUrls: ['./archived-alerts.component.css'],
})
export class ArchivedAlertsComponent {
  displayedColumns: string[] = [
    'symbol',
    'keyLevelName',
    'action',
    'links',
    'description',
    'select',
  ];

  dataSource!: any;
  deleteDisabled = true;
  selection = new SelectionModel<any>(true, []);
  searchKeywordFilter = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private alertsService: AlertsService,
    private modelDialog: MatDialog
  ) {}

  ngOnInit() {
    this.alertsService.getAllArchivedAlerts().subscribe((data) => {});
    this.alertsService.alertsArchived$.subscribe((data) => {
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

  onOpenDescriptionModalDialog(alertObj: AlertObj): void {
    this.modelDialog.open(DescriptionModalComponent, {
      data: alertObj,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }

  onDeleteSelected() {
    const objs = this.selection.selected;
    this.alertsService.deleteTriggeredAlerts(objs).subscribe((data) => {
      this.selection.clear();
    });
    this.deleteDisabled = true;
  }
}
