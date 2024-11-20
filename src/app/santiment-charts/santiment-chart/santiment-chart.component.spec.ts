import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SantimentChartComponent } from './santiment-chart.component';

describe('SantimentChartComponent', () => {
  let component: SantimentChartComponent;
  let fixture: ComponentFixture<SantimentChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SantimentChartComponent]
    });
    fixture = TestBed.createComponent(SantimentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
