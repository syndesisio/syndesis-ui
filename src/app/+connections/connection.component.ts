import { Component, ViewEncapsulation } from '@angular/core';

import { Logger } from '../common/service/log';

let log = Logger.get('+connections');

@Component({
  selector: 'connections',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `<router-outlet></router-outlet>`
})
export class Connections {

  /**
   * Constructor.
   */
  constructor() {
  }

  ngOnInit() {
    log.debug('hello `Connections` component');
  }

}
