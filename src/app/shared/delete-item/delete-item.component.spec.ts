import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemComponent } from './delete-item.component';

describe('DeleteItemComponent', () => {
  let component: DeleteItemComponent;
  let fixture: ComponentFixture<DeleteItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteItemComponent]
    });
    fixture = TestBed.createComponent(DeleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
