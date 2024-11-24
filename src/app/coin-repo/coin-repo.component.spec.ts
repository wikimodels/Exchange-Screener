import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinRepoComponent } from './coin-repo.component';

describe('CoinComponent', () => {
  let component: CoinRepoComponent;
  let fixture: ComponentFixture<CoinRepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinRepoComponent],
    });
    fixture = TestBed.createComponent(CoinRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
