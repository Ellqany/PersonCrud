import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    PersonDetailsComponent,
    ValidationMessageComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    PersonDetailsComponent,
    ValidationMessageComponent
  ]
})
export class ComponentsModule { }
