import {Component} from '@angular/core';

import { Forge } from '../forge.service';

@Component({
    selector: 'detail',
    template: `
    <h1>Hello from Detail</h1>
    <pre *ngIf="urls">{{urls | json}}</pre>
    <div class="spinner spinner-lg" *ngIf="!commands"></div>
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
    errorMessage:any = undefined;

    constructor(private forge:Forge) {

    }
    
    ngOnInit() {
      this.forge.getCommands().subscribe(
        commands => this.commands = commands,
        error => this.errorMessage = error);
      console.log('hello `Detail` component');
    }
    
}
