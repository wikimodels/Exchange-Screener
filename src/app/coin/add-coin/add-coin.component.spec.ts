import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoinComponent } from './add-coin.component';

describe('AddCoinComponent', () => {
  let component: AddCoinComponent;
  let fixture: ComponentFixture<AddCoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCoinComponent]
    });
    fixture = TestBed.createComponent(AddCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
