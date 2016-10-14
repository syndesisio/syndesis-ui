import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { AppHelpers } from '../common/helpers/app';
import { Logger } from '../common/service/log';
import { Forge, CommandOptions } from '../common/service/forge';
import { Kubernetes } from '../common/service/kubernetes';

var log = Logger.get('+Forge');

@Component({
    selector: 'forge-command',
    templateUrl: './forgeCommand.html'
})
/*
 * Component that shows the inputs for a given forge command ID
 */
export class ForgeCommand {

    private commandId:string = undefined;
    private command:any = undefined;
    private error:any = undefined;
    teamId:string = undefined;
    projectId:string = undefined;

    constructor(private forge:Forge, 
                private k8s:Kubernetes,
                private route:ActivatedRoute,
                private router:Router) {

    }

    ngOnInit() {
      var params = AppHelpers.allRouteParams(this.route);
      this.commandId = params['commandId'];
      this.teamId = params['teamId'];
      this.projectId = params['projectId'];
      if (!this.commandId) {
        return;
      }
      var options = <CommandOptions> {
        commandId: this.commandId
      };
      if (this.teamId && this.projectId) {
        options.teamId = this.teamId;
        options.projectId = this.projectId;
      }
      log.debug("Using options: ", options);
      this.forge.getCommandInputs(options).subscribe(
        command => this.command = command,
        error => this.error = error);
    }
}
