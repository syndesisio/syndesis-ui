import {Component} from '@angular/core';

import { Logger } from '../log.service';
import { Forge } from '../forge.service';
import { Kubernetes } from '../kubernetes.service';

var log = Logger.get('+Forge');

@Component({
    selector: 'forge',
    template: `
    <h1>Forge Commands</h1>
    <div class="spinner spinner-lg" *ngIf="!commands"></div>
    <p *ngIf="commands && !commands.length">No commands available</p>
    <ul *ngIf="commands && commands.length">
      <li *ngFor="let command of commands">
        <pre>{{command | json}}</pre>
      </li>
    </ul>
  `
})
export class ForgeView {
    urls:any = undefined;
    commands:any[] = undefined;
    version:any = undefined;
    errorMessage:any = undefined;

    constructor(private forge:Forge, private k8s:Kubernetes) {

    }
    
    ngOnInit() {
      this.forge.getCommands().subscribe(
        commands => this.commands = commands,
        error => this.errorMessage = error);
      this.k8s.getVersion().subscribe(
        version => this.version = version,
        error => this.errorMessage = error);
      log.debug('hello `Forge` component');
    }
}
