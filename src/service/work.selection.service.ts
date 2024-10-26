import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkSelectionService<T> {
  // Shared SelectionModel to manage selected items
  private selection = new SelectionModel<T>(true);

  // BehaviorSubject to emit changes in selection across components
  private selectionSubject = new BehaviorSubject<T[]>(this.selection.selected);

  // Expose selection changes as an observable for all components
  selectionChanges$: Observable<T[]> = this.selectionSubject.asObservable();

  constructor() {
    // Listen to changes in selection and update BehaviorSubject
    this.selection.changed.subscribe(() => {
      this.selectionSubject.next(this.selection.selected);
    });
  }

  // Methods to interact with the shared selection model
  select(items: T[]): void {
    this.selection.select(...items);
  }

  deselect(item: T): void {
    this.selection.deselect(item);
  }

  toggle(item: T): void {
    this.selection.toggle(item);
  }

  clearSelection(): void {
    this.selection.clear();
  }

  isSelected(item: T): boolean {
    return this.selection.isSelected(item);
  }

  isAllSelected(any: T[]): boolean {
    return this.selection.selected.length == any.length;
  }

  clear() {
    this.selection.clear();
  }

  hasValue(): boolean {
    return this.selection.hasValue();
  }
}
