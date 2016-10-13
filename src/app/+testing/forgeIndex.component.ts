
import {Component} from '@angular/core';

import { Logger } from '../log.service';

var log = Logger.get('+Forge');

@Component({
    selector: 'forge-index',
    templateUrl: 'forgeIndex.html'
})
export class ForgeIndex {
    constructor() {

    }
}
