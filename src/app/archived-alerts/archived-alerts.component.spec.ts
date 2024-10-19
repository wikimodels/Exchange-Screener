import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedAlertsComponent } from './archived-alerts.component';

describe('ArchivedAlertsComponent', () => {
  let component: ArchivedAlertsComponent;
  let fixture: ComponentFixture<ArchivedAlertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedAlertsComponent]
    });
    fixture = TestBed.createComponent(ArchivedAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
