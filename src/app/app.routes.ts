import { Routes } from '@angular/router';
import {ProvisionenComponent} from './features/feat-provisionen/provisionen/provisionen.component';
import {ProvisionComponent} from './features/feat-provision/provision/provision.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'provisionen',
    pathMatch: 'full'
  },
  {
    path: 'provisionen',
    component: ProvisionenComponent,
    title: 'Provisionen'
  },
  {
    path: 'provision/:id',
    component: ProvisionComponent,
    title: 'Provision'
  }
];
