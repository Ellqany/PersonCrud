import { Routes } from '@angular/router';

import { ListPersonComponent } from '../../pages/list-person/list-person.component';

export const DefaultLayoutRoutes: Routes = [
  { path: 'person/list', component: ListPersonComponent }
];
