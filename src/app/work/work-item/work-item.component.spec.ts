import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemComponent } from './work-item.component';

describe('WorkItemComponent', () => {
  let component: WorkItemComponent;
  let fixture: ComponentFixture<WorkItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkItemComponent]
    });
    fixture = TestBed.createComponent(WorkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
