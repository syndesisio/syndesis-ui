
import {Component} from '@angular/core';

import { Logger } from '../log.service';

var log = Logger.get('+Forge');

@Component({
    selector: 'forge-index',
    template: `
    <p>&nbsp;</p>
    <ul class="nav nav-tabs">
      <li routerLinkActive="active">
        <a [routerLink]="['forge']">Forge</a>
      </li>
      <li routerLinkActive="active">
        <a [routerLink]="['kubernetes']">Kubernetes</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `
})
export class ForgeIndex {
    constructor() {

    }
}
