import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Coin } from 'models/shared/coin';
import { WorkSelectionService } from 'src/service/work.selection.service';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css'],
})
export class WorkItemComponent implements OnInit {
  @Input() coin!: Coin;
  selectedItems$ = this.selectionService.selectionChanges$;
  constructor(public selectionService: WorkSelectionService<any>) {}

  ngOnInit(): void {
    this.selectedItems$.subscribe((items) => {
      console.log('Component 1 selected items:', items);
    });
  }

  toggleItem(item: Coin): void {
    this.selectionService.toggle(item);
  }
}
