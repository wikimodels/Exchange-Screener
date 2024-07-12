import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollVwap1hComponent } from './coll-vwap1h.component';

describe('CollVwap1hComponent', () => {
  let component: CollVwap1hComponent;
  let fixture: ComponentFixture<CollVwap1hComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollVwap1hComponent]
    });
    fixture = TestBed.createComponent(CollVwap1hComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
