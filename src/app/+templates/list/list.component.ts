import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import * as _ from 'lodash';

import { ITemplate } from '../template.model';
import { TemplateService } from '../template.service';

import { Logger } from '../../common/service/log';
import { Router } from '@angular/router';

let log = Logger.get('+templates/list');

@Component({
  selector: 'templates-list',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./list.scss') ],
  templateUrl: './list.html',
  providers: [ TemplateService ]
})
export class List implements OnInit {

  limit = 80;
  trail = '..';

  //orderByArray: ['name', 'type'];

  listFilter: string;
  errorMessage: string;

  //@Input() templates: ITemplate[];
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
