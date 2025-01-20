import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Coin } from 'models/coin/coin';
import { CoinLinksService } from 'src/service/coin-links.service';
import { WorkSelectionService } from 'src/service/work.selection.service';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css'],
})
export class WorkItemComponent implements OnInit {
  @Input() coin!: Coin;
  selectedItems$ = this.selectionService.selectionChanges$;
  constructor(
    public selectionService: WorkSelectionService<any>,
    public coinsLinksService: CoinLinksService
  ) {}

  ngOnInit(): void {}

  isSelected(coin: Coin) {
    return this.selectionService.isSelected(coin);
  }
  toggleItem(item: Coin): void {
    this.selectionService.toggle(item);
  }
}
