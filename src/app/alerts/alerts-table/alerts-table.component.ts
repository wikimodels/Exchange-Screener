import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertObj } from 'models/alerts/alert-obj';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/service/alerts.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NewAlertComponent } from '../new-alert/new-alert.component';
import { EditAlertComponent } from '../edit-alert/edit-alert.component';

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
    private imageDialog: MatDialog,
    private newAlertDialog: MatDialog,
    public editDialot: MatDialog
  ) {}

  dataSource!: AlertObj[];
  displayedColumns = ['symbol', 'keyLevelName', 'action', 'isActive', 'edit'];

  ngOnInit(): void {
    this.dataSubscription = this.alertsService.alerts$.subscribe(
      (data: AlertObj[]) => {
        this.dataSource = data;
        console.log('Alerts fetched: ', data.length);
      }
    );
  }

  openImageModal(imageUrl: string): void {
    this.imageDialog.open(ImageModalComponent, {
      data: { imageUrl },
      enterAnimationDuration: 10,
      exitAnimationDuration: 300,
    });
  }

  openNewAlertModal(): void {
    this.imageDialog.open(NewAlertComponent, {
      data: {},
      enterAnimationDuration: 10,
      exitAnimationDuration: 300,
    });
  }

  addNewAlert() {
    this.imageDialog.open(NewAlertComponent, {
      data: {},
      enterAnimationDuration: 10,
      exitAnimationDuration: 300,
    });
  }

  editAlert(alertObj: AlertObj) {
    this.editDialot.open(EditAlertComponent, {
      data: alertObj,
      enterAnimationDuration: 10,
      exitAnimationDuration: 300,
    });
  }

  deleteAlert(id: string) {
    console.log(id);
  }

  onClick(event: MouseEvent) {
    event.stopPropagation(); // Stops event propagation
  }

  // onCheckboxChange(event: MatCheckboxChange, element: AlertObj) {
  //   if (event.checked) {
  //     this.selectedIds.push(element.id);
  //   } else {
  //     this.selectedIds = console.log(elementthis.selectedIds.filter((id) => id !== element.id);
  //   }
  //   this.deleteDisabled = this.selectedIds.length == 0 ? true : false;
  //   console.log(this.selectedIds);
  // }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  deleteSelected() {}
}
