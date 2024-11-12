import { Component } from '@angular/core';

@Component({
  selector: 'app-ws',
  templateUrl: './ws.component.html',
  styleUrls: ['./ws.component.css'],
})
export class WsComponent {
  constructor() {}

  onPauseBinanceWs() {}
  onStartBinanceWs() {}
  onShowBinanceWsStatus() {}

  onPauseBybitWs() {}
  onStartBybitWs() {}
  onShowBybitWsStatus() {}
}
