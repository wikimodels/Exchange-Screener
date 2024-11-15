import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDescriptionComponent } from './coin-description.component';

describe('CoinDescriptionComponent', () => {
  let component: CoinDescriptionComponent;
  let fixture: ComponentFixture<CoinDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinDescriptionComponent]
    });
    fixture = TestBed.createComponent(CoinDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
