import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Logger } from '../common/service/log';

let log = Logger.get('+integrations');

@Component({
  selector: 'integrations',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `<router-outlet></router-outlet>`
})
export class Integrations implements OnInit {

  /**
   * Constructor.
   */
  constructor() {
  }

  ngOnInit() {
    log.debug('hello `Integrations` component');
  }

}
