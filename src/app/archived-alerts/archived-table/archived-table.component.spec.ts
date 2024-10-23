import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTableComponent } from './archived-table.component';

describe('ArchivedTableComponent', () => {
  let component: ArchivedTableComponent;
  let fixture: ComponentFixture<ArchivedTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedTableComponent]
    });
    fixture = TestBed.createComponent(ArchivedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
