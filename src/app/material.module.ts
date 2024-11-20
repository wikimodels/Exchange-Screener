import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTooltipModule } from '@angular/material/tooltip';
const modules = [
  MatSortModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatTabsModule,
  DragDropModule,
  MatTableModule,
  MatRadioModule,
  MatInputModule,
  MatSliderModule,
  ScrollingModule,
  MatDialogModule,
  MatSelectModule,
  MatRippleModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatGridListModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatBottomSheetModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  TextFieldModule,
  MatTooltipModule,
];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class AppMaterialModule {}
