import {Component, ViewEncapsulation} from '@angular/core';

import {Logger} from '../../common/service/log';

var log = Logger.get('+integrations/create');

@Component({
    selector: 'integrations-create',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./create.scss')],
    templateUrl: './create.html'
})
export class Create {
    
    constructor() {}
    
    ngOnInit() {
        log.debug('hello `Integrations: Create` component');
    }
    
    
}
