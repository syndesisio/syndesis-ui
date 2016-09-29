
import {Component} from '@angular/core';

import { Logger } from '../log.service';
import { Kubernetes } from '../kubernetes.service';

var log = Logger.get('KubernetesView');

@Component({
    selector: 'kubernetes',
    templateUrl: './kubernetes.html'
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
