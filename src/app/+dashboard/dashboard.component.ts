import { Component, OnInit } from '@angular/core';

// Models
import { ITemplate } from '../+templates/template.model';

// Services
import { TemplateService } from '../+templates/template.service';

import { Logger } from '../common/service/log';
import template = require('lodash/template');

let log = Logger.get('+connections');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  selector: 'dashboard',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    TemplateService,
  ],
  styles: [ require('./dashboard.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

  limit = 80;
  trail = '..';

  listFilter: string;
  errorMessage: string;

  templates: ITemplate[];


  /**
   * Constructor.
   * @param _templateService - TemplateService
   */
  constructor(private _templateService: TemplateService) {
  }

  ngOnInit(): void {
    log.debug('hello `Dashboard` component');

    this._templateService.getAll()
      .subscribe(templates => this.templates = templates,
        error => this.errorMessage = <any>error);
  }
}
