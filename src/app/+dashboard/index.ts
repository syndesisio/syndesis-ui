import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Logger } from '../common/service/log';

import { Dashboard } from './dashboard.component';

Logger.get('+Dashboard').debug('`Dashboard` bundle loaded asynchronously');

const routes = [
  {
    path: '',
    component: Dashboard
  }
];

@NgModule({
  declarations: [
    Dashboard,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export default class DashboardModule {
  static routes = routes;
}

