import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertObj } from 'models/alerts/alert-obj';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/service/alerts.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NewAlertComponent } from '../new-alert/new-alert.component';
import { EditAlertComponent } from '../edit-alert/edit-alert.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DescriptionModalComponent } from 'src/app/description-modal/description-modal.component';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.css'],
})
export class AlertsTableComponent implements OnInit {
  displayedColumns: string[] = [
    'symbol',
    'keyLevelName',
    'action',
    'price',
    'links',
    'isActive',
    'description',
    'edit',
    'archive',
    'select',
  ];

  dataSource!: any;
  deleteDisabled = true;
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  tooltipPosition: TooltipPosition = 'above';

  selection = new SelectionModel<any>(true, []);
  constructor(
    private alertsService: AlertsService,
    private modelDialog: MatDialog
  ) {}

  ngOnInit() {
    this.alertsService.getAllAlerts().subscribe((data) => {});
    this.alertsService.alerts$.subscribe((data) => {
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

  onAddAlert() {
    this.modelDialog.open(NewAlertComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
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
    this.alertsService.deleteAlertsButch(objs).subscribe((data) => {
      this.selection.clear();
    });
    this.deleteDisabled = true;
  }

  onEdit(alertObj: AlertObj) {
    this.modelDialog.open(EditAlertComponent, {
      data: alertObj,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '95vw',
      height: '100vh',
    });
  }

  onMoveToArchive(alertObj: AlertObj) {
    this.alertsService.moveAlertToArchive(alertObj).subscribe();
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
