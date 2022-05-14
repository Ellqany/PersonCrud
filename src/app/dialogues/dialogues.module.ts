import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ComponentsModule } from '../components/components.module';

import { EditPersonComponent } from './edit-person/edit-person.component';
import { AddPersonComponent } from './add-person/add-person.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ComponentsModule,
    MatDialogModule,
    CommonModule
  ],
  declarations: [
    EditPersonComponent,
    AddPersonComponent
  ]
})
export class DialoguesModule { }
