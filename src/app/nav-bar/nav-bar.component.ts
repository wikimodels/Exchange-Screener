import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewAlertComponent } from '../alerts/new-alert/new-alert.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private modelDialog: MatDialog) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  onAddAlert() {
    console.log('SHIT');
    this.modelDialog.open(NewAlertComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
      width: '100vw',
      height: '100vh',
    });
  }
}
