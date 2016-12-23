import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Logger } from '../common/service/log';

import { Dashboard } from './dashboard.component';
import { TemplateFilter } from '../+templates/template.pipe';

Logger.get('+Dashboard').debug('`Dashboard` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
  {
    path: '',
    component: Dashboard
  }
];

@NgModule({
  declarations: [
    Dashboard,

    // Pipes
    TemplateFilter,
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

