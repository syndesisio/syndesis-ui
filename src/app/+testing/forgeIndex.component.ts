
import {Component} from '@angular/core';

import { Logger } from '../common/service/log';

var log = Logger.get('+Forge');

@Component({
    selector: 'forge-index',
    templateUrl: 'forgeIndex.html'
})
export class ForgeIndex {
    constructor() {

    }
}
