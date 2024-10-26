import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Coin } from 'models/shared/coin';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css'],
})
export class WorkItemComponent {
  @Input() coin!: Coin;
  onDataToggled(coin: Coin) {}
}
