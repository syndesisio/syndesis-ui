import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../app.service';
import { Subscription } from 'rxjs/Subscription';

// Templates
import { ITemplate } from '../template.model';
import { TemplateService } from '../template.service';

import { Logger } from '../../common/service/log';
let log = Logger.get('+templates/create');

const STATE_KEY = 'template-create-state';

@Component({
  selector: 'templates-create',
  styles: [ require('./create.scss') ],
  templateUrl: './create.html',
  providers: [ TemplateService ]
})
export class Create implements OnInit, OnDestroy {

  limit = 60;
  trail = '..';

  // Templates
  templates: ITemplate[];
  template: ITemplate;

  name: string;
  description: string;
  tags: string;
  defaults = {};


  private error: string;
  private sub: Subscription;

  /**
   * Constructor.
   * @param _templateService - TemplateService
   * @param _route - ActivatedRoute,
   * @param _router - Router
   * @param _state - AppState
   */
  constructor(private _templateService: TemplateService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _state: AppState) {
    this.error = '';
  }

  ngOnInit(): void {
    log.debug('hello `Templates: Create` component');

    log.debug('this._route.params: ' + JSON.stringify(this._route.params['_value'].id));
  }

  ngOnDestroy() {}

}
