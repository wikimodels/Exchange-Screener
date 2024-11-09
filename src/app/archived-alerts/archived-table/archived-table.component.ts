import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'models/alerts/alert';
import { AlertsCollections } from 'models/alerts/alerts-collections';
import { DescriptionModalComponent } from 'src/app/shared/description-modal/description-modal.component';
import { EditAlertComponent } from 'src/app/shared/edit-alert/edit-alert.component';
import { AlertsGenericService } from 'src/service/alerts/alerts-generic.service';

@Component({
  selector: 'app-archived-table',
  templateUrl: './archived-table.component.html',
  styleUrls: ['./archived-table.component.css'],
})
export class ArchivedTableComponent {
  displayedColumns: string[] = [
    'symbol',
    'alertName',
    'action',
    'links',
    'description',
    'edit',
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
    private alertsService: AlertsGenericService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.alertsService
      .alerts$(AlertsCollections.ArchivedAlerts)
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

  onOpenDescriptionModalDialog(alert: Alert): void {
    this.matDialog.open(DescriptionModalComponent, {
      data: alert,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }

  onDeleteSelected() {
    const alerts = this.selection.selected as Alert[];
    const ids = alerts.map((a) => a.id);
    this.alertsService.deleteMany(AlertsCollections.ArchivedAlerts, ids);
    this.deleteDisabled = true;
  }

  onEdit(alert: Alert) {
    this.matDialog.open(EditAlertComponent, {
      data: { collectionName: AlertsCollections.ArchivedAlerts, alert: alert },
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
}
