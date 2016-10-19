import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Logger } from '../common/service/log';
import { AppHelpers } from '../common/helpers/app';
import { Forge, CommandOptions } from '../common/service/forge';
import { Kubernetes } from '../common/service/kubernetes';

import * as _ from 'lodash';

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

    teamId:string = undefined;
    projectId:string = undefined;

    constructor(private forge:Forge, 
                private k8s:Kubernetes,
                private route:ActivatedRoute,
                private router:Router) {

    }

    commandsFor(name:string) {
      return _.get(this.commandMap, 'commands.' + name) || [];
    }
    
    ngOnInit() {
      var params = AppHelpers.allRouteParams(this.route);
      this.teamId = params['teamId'];
      this.projectId = params['projectId'];
      var options:CommandOptions = undefined;
      if (this.teamId && this.projectId) {
        options = {
          teamId: this.teamId,
          projectId: this.projectId
        }
      }
      this.forge.getCommands(options).subscribe(
        commandMap => this.commandMap = commandMap,
        error => this.errorMessage = error);
      log.debug('hello `Forge` component');
    }
}
