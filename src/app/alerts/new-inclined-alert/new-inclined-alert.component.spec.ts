import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInclinedAlertComponent } from './new-inclined-alert.component';

describe('NewInclinedAlertComponent', () => {
  let component: NewInclinedAlertComponent;
  let fixture: ComponentFixture<NewInclinedAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInclinedAlertComponent]
    });
    fixture = TestBed.createComponent(NewInclinedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
