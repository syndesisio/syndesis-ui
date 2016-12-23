import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import * as _ from 'lodash';

import { IIntegration } from '../integration.model';
import { IntegrationService } from '../integration.service';
import { TemplateService } from '../../+templates/template.service';

import { Logger } from '../../common/service/log';
import { Router } from '@angular/router';

let log = Logger.get('+integrations/list');

@Component({
  selector: 'integrations-list',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./list.scss') ],
  templateUrl: './list.html',
  providers: [ IntegrationService, TemplateService ]
})
export class List implements OnInit {

  limit = 80;
  trail = '..';

  //orderByArray: ['name', 'type'];

  listFilter: string;
  errorMessage: string;

  //@Input() integrations: IIntegration[];
  integrations: IIntegration[];


  /**
   * Constructor.
   * @param _router - Router
   * @param _integrationService - IntegrationService
   */
  constructor(private _router: Router,
              private _integrationService: IntegrationService) {
  }

  ngOnInit(): void {
    log.debug('hello `Integrations: List` component');

    this._integrationService.getAll()
      .subscribe(integrations => this.integrations = integrations,
        error => this.errorMessage = <any>error);
  }

  deleteIntegration(integration: IIntegration, $event: any): void {
    this._integrationService.del(integration.id);
  }

  duplicateIntegration(integration: IIntegration, $event: any): void {
    // Remove ID from Integration instance
    integration.id = null;

    this._integrationService.create(integration);
  }

  editIntegration(integration: IIntegration, $event: any): void {
    //log.debug('Integration: ', integration);

    let link = [ 'integrations', 'edit', integration.name.toLowerCase() ];

    this._router.navigate(link);
  }

  goBack(): void {
    this._router.navigate(['/dashboard']);
  }

  gotoDetail(integration: IIntegration, $event: any): void {
    //log.debug('$event: ', $event);

    let className = _.get($event, 'target.className');

    //log.debug('Class name: ', className);

    if ($event && $event.target && $event.target.className.indexOf('dropdown-toggle') !== -1) {
      return;
    }

    log.debug('Integration: ', integration);

    //let link = [ 'integrations', 'detail', integration.name.toLowerCase() ];
    let link = [ 'integrations', 'detail', integration.id ];

    this._router.navigate(link);
  }

  sort(): void {
    //this.integrations = !this.showImage;
  }

}
