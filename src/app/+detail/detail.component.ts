import {Component} from '@angular/core';

import { Logger } from '../log.service';
import { Forge } from '../forge.service';
import { Kubernetes } from '../kubernetes.service';

var log = Logger.get('+detail');

@Component({
    selector: 'detail',
    template: `
    <h1>Hello from Detail</h1>
    <pre *ngIf="urls">{{urls | json}}</pre>
    <div class="spinner spinner-lg" *ngIf="!commands"></div>
    <pre *ngIf="version">Kubernetes version: {{version | json}}</pre>
    <p *ngIf="commands && !commands.length">No commands available</p>
    <ul *ngIf="commands && commands.length">
      <li *ngFor="let command of commands">
        <pre>{{command | json}}</pre>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `
})
export class Detail {
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
      log.debug('hello `Detail` component');
    }


    
}
