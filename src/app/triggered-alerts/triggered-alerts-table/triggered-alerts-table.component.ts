import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AlertObj } from 'models/alerts/alert-obj';
import { AlertsService } from 'src/service/alerts.service';

/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-triggered-alerts-table',
  templateUrl: './triggered-alerts-table.component.html',
  styleUrls: ['./triggered-alerts-table.component.css'],
})
export class TriggeredAlertsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'symbol',
    'keyLevelName',
    'action',
    'activationTimeStr',
    'links',
    'description',
    'image',
    'select',
  ];

  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  selection = new SelectionModel<any>(true, []); // Allows multiple selections
  constructor(private alertsService: AlertsService) {}

  ngOnInit() {
    this.alertsService.getAllAlerts().subscribe((data) => {});
    this.alertsService.alerts$.subscribe((data) => {
      console.log('DATA ==>', data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // Move paginator and sort setup inside subscribe
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {}

  // Filter function
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDataToggled(data: any) {
    this.selection.toggle(data);
    console.log(this.selection.selected);
  }

  // Toggle "Select All" checkbox
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data); // Use dataSource.data for the array of elements
    }
  }

  // Check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length; // Use dataSource.data.length
    return numSelected === numRows;
  }

  onClick(event: MouseEvent) {
    event.stopPropagation(); // Stops event propagation
  }
}
