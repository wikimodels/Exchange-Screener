import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollVwap15mComponent } from './coll-vwap15m.component';

describe('CollVwap15mComponent', () => {
  let component: CollVwap15mComponent;
  let fixture: ComponentFixture<CollVwap15mComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollVwap15mComponent]
    });
    fixture = TestBed.createComponent(CollVwap15mComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
