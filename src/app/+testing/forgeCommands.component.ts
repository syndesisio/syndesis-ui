import { Component } from '@angular/core';

import { Logger } from '../common/service/log';
import { Forge } from '../common/service/forge';
import { Kubernetes } from '../common/service/kubernetes';

declare var _: any;

var log = Logger.get('+Forge');

@Component({
    selector: 'forge-commands',
    templateUrl: './forgeCommands.html'
})
/*
 * Component that lists all available forge commands
 */
export class ForgeCommands {
    commandMap:any = undefined;
    selected:string = undefined;
    errorMessage:any = undefined;

    constructor(private forge:Forge, private k8s:Kubernetes) {

    }

    commandsFor(name:string) {
      return _.get(this.commandMap, 'commands.' + name) || [];
    }
    
    ngOnInit() {
      this.forge.getCommands().subscribe(
        commandMap => this.commandMap = commandMap,
        error => this.errorMessage = error);
      log.debug('hello `Forge` component');
    }
}
