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
  constructor(
    private alertsService: AlertsService,
    private dialog: MatDialog
  ) {}

  dataSource!: AlertObj[];
  columnsToDisplay = ['symbol', 'keyLevelName', 'action', 'isActive', 'links'];
  // columnAliases  = {
  //   symbol: 'Symbol',
  //   keyLevelName: 'Key Level Name',
  //   isActive: 'Active Status',
  //   expandedDetail: 'Details',
  // };

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: PeriodicElement | null;
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

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
