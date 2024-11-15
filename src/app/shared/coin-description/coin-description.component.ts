import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Coin } from 'models/coin/coin';
import { DescriptionModalComponent } from 'src/app/shared/description-modal/description-modal.component';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';

@Component({
  selector: 'app-coin-description',
  templateUrl: './coin-description.component.html',
  styleUrls: ['./coin-description.component.css'],
})
export class CoinDescriptionComponent implements OnInit {
  coin!: Coin;
  description!: string | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { coin: Coin; collectionName: string },
    private coinsService: CoinsGenericService,
    public dialogRef: MatDialogRef<CoinDescriptionComponent>
  ) {}

  ngOnInit(): void {
    this.coin = { ...this.data.coin };
    this.description = this.coin.description;

    this.dialogRef.afterClosed().subscribe(() => {
      if (this.coin.description != this.description) {
        this.saveChanges();
      }
    });
  }

  saveChanges() {
    this.coinsService.updateOne(
      this.data.collectionName,
      this.coin.symbol,
      this.coin
    );
  }
}
