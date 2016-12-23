import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../common/directives';

import { Logger } from '../common/service/log';

// Components
import { Templates } from './template.component';
import { Create } from './create/create.component';
//import { Edit } from './edit/edit.component';
//import { Detail } from './detail/detail.component';
import { List } from './list/list.component';

// Pipes
import { FieldFilter } from '../common/pipes/field.pipe';
import { Truncate } from '../common/pipes/truncate';
import { TemplateFilter } from './template.pipe';
import { OrderBy } from '../common/pipes/orderBy';

Logger.get('+Templates').debug('`Templates` bundle loaded asynchronously');

// Async components must be named routes for WebpackAsyncRoute
const routes = [
  {
    path: '',
    component: Templates,
    children: [
      {path: '', component: List},
      {path: 'create', component: Create},
      {path: 'create/:id', component: Create}
    ]
  }
];

@NgModule({
  declarations: [
    // Components
    Templates,
    Create,
    List,

    // Pipes
    FieldFilter,
    OrderBy,
    TemplateFilter,
    Truncate
  ],
  imports: [
    CommonModule,
    FormsModule,
    //ReactiveFormsModule,
    //DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export default class TemplatesModule {
  static routes = routes;
}



