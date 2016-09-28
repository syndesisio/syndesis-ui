import {Component} from '@angular/core';

import { Logger } from '../log.service';
import { Forge } from '../forge.service';
import { Kubernetes } from '../kubernetes.service';

declare var _: any;

var log = Logger.get('+Forge');

@Component({
    selector: 'forge-commands',
    template: `
    <h1>Forge Commands</h1>
    <div class="spinner spinner-lg" *ngIf="!commandMap"></div>
    <div *ngIf="commandMap">
      <div class="panel-group">
        <div class="panel panel-default" *ngFor="let name of commandMap.names">
          <div class="panel-heading">
            <div class="panel-title">
              <h4>{{name}}</h4>
            </div>
          </div>
          <div class="panel-collapse">
            <div class="panel-body" style="padding: 0">
              <ul class="list-group">
                <li class="list-group-item" *ngFor="let command of commandsFor(name)">
                  <a [routerLink]="[command.id]">{{command.name}}</a>
                  <p>{{command.description}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- DEBUG info
    <pre *ngIf="commandMap">{{commandMap | json}}</pre>
    -->
  `
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
