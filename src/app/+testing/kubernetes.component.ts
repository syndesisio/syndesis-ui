
import {Component} from '@angular/core';

import * as URI from 'urijs';

import { Logger } from '../common/service/log';
import { KindTypes, KubernetesAPI } from '../common/helpers/kubernetes';
import { GetOptions, Kubernetes } from '../common/service/kubernetes';

var log = Logger.get('KubernetesView');

@Component({
    selector: 'kubernetes',
    templateUrl: './kubernetes.html'
})
export class KubernetesView {
    version:any = undefined;
    namespaces:any = undefined;
    buildconfigs:any = undefined;
    services:any = undefined;
    f8Service:any = undefined;
    errorMessage:any = undefined;

    constructor(private k8s:Kubernetes) {

    }
    
    ngOnInit() {
      this.k8s.getVersion().subscribe(
        version => this.version = version,
        error => this.errorMessage = error);
      this.k8s.get({ 
        kind: KindTypes.NAMESPACES, 
        labelSelector: 'type=team'
      }).subscribe(
        namespaces => this.namespaces = namespaces,
        error => this.errorMessage = error
      );
      this.k8s.get({ kind: KindTypes.SERVICES, namespace: 'default' }).subscribe(
        services => this.services = services,
        error => this.errorMessage = error
      );
      this.k8s.get({ kind: KindTypes.BUILD_CONFIGS, namespace: 'default' }).subscribe(
        buildconfigs => this.buildconfigs = buildconfigs,
        error => this.errorMessage = error
      );
      this.k8s.get({ kind: KindTypes.SERVICES, namespace: 'default', name: 'fabric8', fieldSelector: 'metadata' }).subscribe(
        service => this.f8Service = service,
        error => this.errorMessage = error
      );
      log.debug('hello `Kubernetes` component');
    }


    
}
