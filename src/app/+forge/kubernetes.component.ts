
import {Component} from '@angular/core';

import { Logger } from '../log.service';
import { Kubernetes } from '../kubernetes.service';

var log = Logger.get('KubernetesView');

@Component({
    selector: 'kubernetes',
    template: `
    <h1>Kubernetes</h1>
    <div class="spinner spinner-lg" *ngIf="!version"></div>
    <pre *ngIf="version">Kubernetes version: {{version | json}}</pre>
  `
})
export class KubernetesView {
    version:any = undefined;
    errorMessage:any = undefined;

    constructor(private k8s:Kubernetes) {

    }
    
    ngOnInit() {
      this.k8s.getVersion().subscribe(
        version => this.version = version,
        error => this.errorMessage = error);
      log.debug('hello `Kubernetes` component');
    }


    
}
