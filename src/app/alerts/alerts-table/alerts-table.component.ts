import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertObj } from 'models/alerts/alert-obj';
import { Subscription } from 'rxjs';
import { AlertsService } from 'service/alerts.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('void', style({ height: '0px', minHeight: '0' })), // 'void' state for when the row is removed
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ), // Adding transition for 'void'
    ]),
  ],
})
export class AlertsTableComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription | null = null;
  deleteDisabled = true;
  constructor(
    private alertsService: AlertsService,
    private dialog: MatDialog
  ) {}

  dataSource!: AlertObj[];
  columnsToDisplay = [
    'symbol',
    'keyLevelName',
    'action',
    'isActive',
    'links',
    'edit',
  ];

  columnAliases: { [key: string]: string } = {
    symbol: 'Symbol',
    keyLevelName: 'Key Level Name',
    action: 'Action',
    isActive: 'Active Status',
    links: 'Links',
  };

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: any | null;
  selectedIds: string[] = [];

  ngOnInit(): void {
    this.dataSubscription = this.alertsService
      .getAllAlerts()
      .subscribe((data: AlertObj[]) => {
        this.dataSource = data;
        console.log(data);
      });
  }

  openImageModal(imageUrl: string): void {
    this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
      enterAnimationDuration: 10,
      exitAnimationDuration: 300,
    });
  }

  editAlert(element: AlertObj) {
    console.log(element);
  }

  deleteAlert(id: string) {
    console.log(id);
  }

  onClick(event: MouseEvent) {
    event.stopPropagation(); // Stops event propagation
  }

  onCheckboxChange(event: MatCheckboxChange, element: AlertObj) {
    if (event.checked) {
      this.selectedIds.push(element.id);
    } else {
      this.selectedIds = this.selectedIds.filter((id) => id !== element.id);
    }
    this.deleteDisabled = this.selectedIds.length == 0 ? true : false;
    console.log(this.selectedIds);
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  addNewAlert() {}
  deleteSelected() {}
}
