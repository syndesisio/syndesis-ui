import {Component, ViewEncapsulation} from '@angular/core';

import {Logger} from '../common/service/log';

var log = Logger.get('+integrations');

@Component({
    selector: 'integrations',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `<router-outlet></router-outlet>`
})
export class Integrations {
    
    constructor() {}
    
    ngOnInit() {
        log.debug('hello `Integrations` component');
    }
    
}
