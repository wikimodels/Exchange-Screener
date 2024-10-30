import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertObj } from 'models/alerts/alert-obj';
import { DescriptionModalComponent } from 'src/app/shared/description-modal/description-modal.component';
import { ArchivedAlertsService } from 'src/service/alerts/archived-alerts.service';

@Component({
  selector: 'app-archived-table',
  templateUrl: './archived-table.component.html',
  styleUrls: ['./archived-table.component.css'],
})
export class ArchivedTableComponent {
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
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();

  selection = new SelectionModel<any>(true, []);
  constructor(
    private archivedAlertsService: ArchivedAlertsService,
    private modelDialog: MatDialog
  ) {}

  ngOnInit() {
    this.archivedAlertsService.getAllArchivedAlerts().subscribe((data) => {});
    this.archivedAlertsService.alertsArchived$.subscribe((data) => {
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
    this.archivedAlertsService
      .deleteArchivedAlertsBatch(objs)
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
