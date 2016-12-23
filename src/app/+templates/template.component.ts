import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Logger } from '../common/service/log';

let log = Logger.get('+templates');

@Component({
  selector: 'templates',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `<router-outlet></router-outlet>`
})
export class Templates implements OnInit {

  /**
   * Constructor.
   */
  constructor() {
  }

  ngOnInit() {
    log.debug('hello `Templates` component');
  }

}
