import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredAlertsTableComponent } from './triggered-alerts-table.component';

describe('TriggeredAlertsTableComponent', () => {
  let component: TriggeredAlertsTableComponent;
  let fixture: ComponentFixture<TriggeredAlertsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggeredAlertsTableComponent]
    });
    fixture = TestBed.createComponent(TriggeredAlertsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
