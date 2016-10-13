import {Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Logger } from '../log.service';
import { Forge } from '../forge.service';
import { Kubernetes } from '../kubernetes.service';

var log = Logger.get('+Forge');

@Component({
    selector: 'forge-command',
    templateUrl: './forgeCommand.html'
})
/*
 * Component that shows the inputs for a given forge command ID
 */
export class ForgeCommand {

    private id:string = undefined;
    private command:any = undefined;
    private error:any = undefined;

    constructor(private forge:Forge, 
                private k8s:Kubernetes,
                private route:ActivatedRoute,
                private router:Router) {

    }

    ngOnInit() {
      this.route.params.forEach((params:Params) => {
        this.id = params['id'];
      });
      if (!this.id) {
        return;
      }
      this.forge.getCommandInputs(this.id).subscribe(
        command => this.command = command,
        error => this.error = error);
    }
}
