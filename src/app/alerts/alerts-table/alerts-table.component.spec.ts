import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsTableComponent } from './alerts-table.component';

describe('AlertsTableComponent', () => {
  let component: AlertsTableComponent;
  let fixture: ComponentFixture<AlertsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsTableComponent]
    });
    fixture = TestBed.createComponent(AlertsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
