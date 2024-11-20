import { Component, OnInit } from '@angular/core';
import { Coin } from 'models/coin/coin';
import { SantimentGenericService } from 'src/service/santiment/santiment-generic.service';

@Component({
  selector: 'app-santiment',
  templateUrl: './santiment.component.html',
  styleUrls: ['./santiment.component.css'],
})
export class SantimentComponent implements OnInit {
  symbols: string[] = [];
  constructor(private santimentService: SantimentGenericService) {}

  ngOnInit(): void {
    this.santimentService
      .getSantimentDataMissingCoins()
      .subscribe((data: Coin[]) => {
        this.symbols = data.map((d) => d.symbol);
      });
  }
}
