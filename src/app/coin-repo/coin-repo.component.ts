import { Component } from '@angular/core';
import { CoinsCollections } from 'models/coin/coins-collections';
import { TablesCssClasses } from 'models/shared/table-css-classes';

@Component({
  selector: 'app-coin-repo',
  templateUrl: './coin-repo.component.html',
  styleUrls: ['./coin-repo.component.css'],
})
export class CoinRepoComponent {
  collectionName = CoinsCollections.CoinRepo;
  tableCssClass = TablesCssClasses.CoinRepo;
  tableHeader = 'Coin Repo';
  showButtons = {
    coinSorter: true,
    coinProvider: true,
    coinRepo: false,
    coinBlackList: true,
  };
}
