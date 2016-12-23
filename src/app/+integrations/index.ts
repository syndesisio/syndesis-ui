import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Logger } from '../common/service/log';

// Components
import { Integrations } from './integration.component';
import { Create } from './create/create.component';
//import { Edit } from './edit/edit.component';
//import { Detail } from './detail/detail.component';
import { List } from './list/list.component';

// Pipes
import { FieldFilter } from '../common/pipes/field.pipe';
import { Truncate } from '../common/pipes/truncate';
import { IntegrationFilter } from './integration.pipe';
import { OrderBy } from '../common/pipes/orderBy';

Logger.get('+Integrations').debug('`Integrations` bundle loaded asynchronously');

// Async components must be named routes for WebpackAsyncRoute
const routes = [
  {
    path: '',
    component: Integrations,
    children: [
      {path: '', component: List},
      {path: 'create', component: Create},
      {path: 'create/:id', component: Create}//,
      //{path: 'edit/:id', component: Edit},
      //{path: 'detail/:id', component: Detail}
    ]
  }
];

@NgModule({
  declarations: [
    // Components
    Integrations,
    Create,
    List,

    // Pipes
    //FieldFilter,
    IntegrationFilter,
    //OrderBy,
    //Truncate
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export default class IntegrationsModule {
  static routes = routes;
}



