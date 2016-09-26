import {Component} from '@angular/core';

import {AppState} from '../app.service';

@Component({
    selector: 'detail',
    template: `
    <h1>Hello from Detail</h1>
    <pre *ngIf="urls">{{urls | json}}</pre>
    <router-outlet></router-outlet>
  `
})
export class Detail {
    urls:any = undefined;
    constructor(appState: AppState) {
      this.urls = appState.config.urls;
    }
    
    ngOnInit() {
        console.log('hello `Detail` component');
    }
    
}
