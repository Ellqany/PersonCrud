import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'person/list',
    pathMatch: 'full',
  }, {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/default-layout/default-layout.module').then(m => m.DefaultLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'person/list'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
    useHash: false,
    initialNavigation: 'enabledBlocking'
})
  ],
  exports: [],
})
export class AppRoutingModule { }
