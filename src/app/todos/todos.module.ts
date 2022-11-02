import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosIndexComponent } from './todos-index/todos-index.component';
import { ItemComponent } from './item/item.component';
import { ShowDonePipe } from './show-done.pipe';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    TodosIndexComponent,
    ItemComponent,
    ShowDonePipe,
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class TodosModule { }
