import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ComponentsModule } from '../../components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from '../../pipes/pipes.module';

import { DefaultLayoutRoutes } from './default-layout.routing';
import { ListPersonComponent } from '../../pages/list-person/list-person.component';

@NgModule({
  imports: [
    RouterModule.forChild(DefaultLayoutRoutes),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ComponentsModule,
    MatDialogModule,
    CommonModule,
    PipeModule,
    NgbModule,
  ],
  declarations: [
    ListPersonComponent
  ]
})

export class DefaultLayoutModule { }
