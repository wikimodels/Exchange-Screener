import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlertComponent } from './edit-inclined-alert.component';

describe('EditAlertComponent', () => {
  let component: EditAlertComponent;
  let fixture: ComponentFixture<EditAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAlertComponent],
    });
    fixture = TestBed.createComponent(EditAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
