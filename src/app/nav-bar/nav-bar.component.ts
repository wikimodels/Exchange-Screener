import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ALERTS_AT_WORK, TRIGGERED_ALERTS } from 'src/consts/url-consts';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
