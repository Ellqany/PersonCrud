import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgePipe } from './age/age.pip';


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    AgePipe
  ],
  exports: [
    AgePipe
  ]
})
export class PipeModule { }
