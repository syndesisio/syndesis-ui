import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// Models
import { ITemplate } from '../+templates/template.model';

// Services
import { TemplateService } from '../+templates/template.service';

import { Logger } from '../common/service/log';
import template = require("lodash/template");

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
   * @param _router - Router
   * @param _templateService - TemplateService
   */
  constructor(private _router: Router,
              private _templateService: TemplateService) {
  }

  ngOnInit(): void {
    log.debug('hello `Templates: List` component');

    this._templateService.getAll()
      .subscribe(templates => this.templates = templates,
        error => this.errorMessage = <any>error);
  }

  deleteTemplate(template: ITemplate, $event: any): void {
    this._templateService.del(template.id);
  }

  duplicateTemplate(template: ITemplate, $event: any): void {
    // Remove ID from Template instance
    template.id = null;

    this._templateService.create(template);
  }

  editTemplate(template: ITemplate, $event: any): void {
    //log.debug('Template: ', template);

    let link = [ 'templates', 'edit', template.name.toLowerCase() ];

    this._router.navigate(link);
  }

  goBack(): void {
    this._router.navigate(['/dashboard']);
  }

  gotoDetail(template: ITemplate, $event: any): void {
    //log.debug('$event: ', $event);

    let className = _.get($event, 'target.className');

    //log.debug('Class name: ', className);

    if ($event && $event.target && $event.target.className.indexOf('dropdown-toggle') !== -1) {
      return;
    }

    log.debug('Template: ', template);

    //let link = [ 'templates', 'detail', template.name.toLowerCase() ];
    let link = [ 'templates', 'detail', template.id ];

    this._router.navigate(link);
  }

  sort(): void {
    //this.templates = !this.showImage;
  }
}
