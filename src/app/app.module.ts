import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Angular Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AppComponent } from './app.component';


import { ComponentsModule } from './components/components.module';
import { DialoguesModule } from './dialogues/dialogues.module';
import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [
    SimpleNotificationsModule.forRoot(),
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    DialoguesModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule,
    NgbModule
  ],
  declarations: [
    DefaultLayoutComponent,
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
