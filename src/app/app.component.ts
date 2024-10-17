import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CoinsService } from 'service/coins.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription | null = null;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private coinsService: CoinsService
  ) {
    this.registerIcons();
  }
  ngOnInit(): void {
    this.dataSubscription = this.coinsService
      .getAllCoins()
      .subscribe((data: any) => {
        console.log(this.coinsService.Coins);
      });
  }
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
  registerIcons(): void {
    const icons: { name: string; url: string }[] = [
      { name: 'check', url: 'assets/icons/check.svg' },
      { name: 'close', url: 'assets/icons/close.svg' },
      { name: 'alarm', url: 'assets/icons/alarm.svg' },
      { name: 'triggered-alarm', url: 'assets/icons/triggered-alarm.svg' },
      { name: 'bybit', url: 'assets/icons/bybit.svg' },
      { name: 'tv', url: 'assets/icons/tv.svg' },
      { name: 'binance', url: 'assets/icons/binance-black.svg' },
      { name: 'coinglass', url: 'assets/icons/coinglass.svg' },
      { name: 'edit', url: 'assets/icons/edit.svg' },
      { name: 'delete', url: 'assets/icons/delete.svg' },
      // Add more icons here
    ];

    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }
}
