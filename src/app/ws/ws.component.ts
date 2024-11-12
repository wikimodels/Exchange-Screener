import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinanceWsConnManagerService } from 'src/service/ws/binance-ws-conn-manager.service';
import { BybitWsConnManagerService } from 'src/service/ws/bybit-ws-conn-manager.service';

@Component({
  selector: 'app-ws',
  templateUrl: './ws.component.html',
  styleUrls: ['./ws.component.css'],
})
export class WsComponent implements OnInit, OnDestroy {
  binanceSub!: Subscription | null;
  bybitSub!: Subscription | null;
  binanceResponse!: any | null;
  bybitResponse!: any | null;

  constructor(
    private binanceWsConnManager: BinanceWsConnManagerService,
    private bybitWsConnManager: BybitWsConnManagerService
  ) {}

  ngOnInit(): void {
    this.binanceSub = this.binanceWsConnManager.binanceWsConnections$.subscribe(
      (data: any) => {
        this.binanceResponse = JSON.stringify(data, null, 2);
        console.log(data);
      }
    );
    this.bybitSub = this.bybitWsConnManager.bybitWsConnections$.subscribe(
      (data: any) => {
        this.bybitResponse = JSON.stringify(data, null, 2);
        console.log(data);
      }
    );
  }

  // BINANCE WS MANAGER
  onStartBinanceWs() {
    this.binanceWsConnManager.startWsConnections();
  }

  onPauseBinanceWs() {
    this.binanceWsConnManager.pauseWsConnections();
  }

  onShowBinanceWsStatus() {
    this.binanceWsConnManager.getWsConnectionsStatus();
  }

  // BYBIT WS MANAGER
  onStartBybitWs() {
    this.bybitWsConnManager.startWsConnections();
  }

  onPauseBybitWs() {
    this.bybitWsConnManager.pauseWsConnections();
  }

  onShowBybitWsStatus() {
    this.bybitWsConnManager.getWsConnectionsStatus();
  }

  ngOnDestroy(): void {
    if (this.binanceSub) {
      this.binanceSub.unsubscribe();
    }
    if (this.bybitSub) {
      this.bybitSub.unsubscribe();
    }
  }
}
