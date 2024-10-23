import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionModalComponent } from './description-modal.component';

describe('DescriptionModalComponent', () => {
  let component: DescriptionModalComponent;
  let fixture: ComponentFixture<DescriptionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionModalComponent]
    });
    fixture = TestBed.createComponent(DescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
