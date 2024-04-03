import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { GaugesComponent } from './gauges/gauges.component';
import { CardComponent } from './gauges/card/card.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, CardComponent, GaugesComponent, TestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    NgxGaugeModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
