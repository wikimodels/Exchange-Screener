import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SantimentComponent } from './santiment.component';

describe('SantimentComponent', () => {
  let component: SantimentComponent;
  let fixture: ComponentFixture<SantimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SantimentComponent]
    });
    fixture = TestBed.createComponent(SantimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
