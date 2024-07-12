import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollVwap4hComponent } from './coll-vwap4h.component';

describe('CollVwap4hComponent', () => {
  let component: CollVwap4hComponent;
  let fixture: ComponentFixture<CollVwap4hComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollVwap4hComponent]
    });
    fixture = TestBed.createComponent(CollVwap4hComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
