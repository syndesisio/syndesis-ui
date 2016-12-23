import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Logger } from '../../common/service/log';

let log = Logger.get('+integrations/create');

@Component({
  selector: 'integrations-create',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./create.scss') ],
  templateUrl: './create.html'
})
export class Create implements OnInit {

  /**
   * Constructor.
   */
  constructor() {
  }

  ngOnInit() {
    log.debug('hello `Integrations: Create` component');
  }

}
