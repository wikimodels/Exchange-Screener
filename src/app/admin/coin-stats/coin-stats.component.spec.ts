import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinStatsComponent } from './coin-stats.component';

describe('CoinStatsComponent', () => {
  let component: CoinStatsComponent;
  let fixture: ComponentFixture<CoinStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinStatsComponent]
    });
    fixture = TestBed.createComponent(CoinStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
