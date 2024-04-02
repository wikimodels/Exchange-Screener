import { Component } from '@angular/core';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ExchangeScreener';
  thresholdConfig = {
    '1': { color: 'red' },
    '41': { color: 'yellow' },
    '90': { color: 'green' },
  };
  gaugeType = 'semi' as NgxGaugeType;
  gaugeValue = 89.3;
  gaugeLabel = 'Speed';
  gaugeAppendText = 'km/hr';
  public gaugemax = 100;
  constructor() {
    setInterval(() => {
      this.gaugeValue = Math.floor(Math.random() * 2000 + 1);
    }, 1500);
  }
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  timePeriods = ['X', 'XX', 'XXX', 'XXXX', 'XXXXX'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
}
