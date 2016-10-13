
import {Component} from '@angular/core';

import * as URI from 'urijs';

import { Logger } from '../common/service/log';
import { KindTypes, KubernetesAPI } from '../common/helpers/kubernetes';
import { Kubernetes } from '../common/service/kubernetes';

var log = Logger.get('KubernetesView');

// set a path override for buildconfigs and make sure that works
KubernetesAPI.setPathOverride(KindTypes.BUILD_CONFIGS, (apiServerUri:uri.URI, kind:string, namespace?:string, name?:string):string => {
  kind = KubernetesAPI.toCollectionName(kind);
  var answer = apiServerUri.segment('/api/v1/proxy/namespaces/default/services/jenkinshift:80/').segment(KubernetesAPI.prefixForKind(kind));
  if (namespace) {
    answer.segment('namespaces').segment(namespace);
  }
  answer.segment(kind);
  if (name) {
    answer.segment(name);
  }
  console.warn("Using override: ", answer.toString());
  return answer.toString();
});

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
      this.k8s.get(KindTypes.NAMESPACES).subscribe(
        namespaces => this.namespaces = namespaces,
        error => this.errorMessage = error
      );
      this.k8s.get(KindTypes.SERVICES, 'default').subscribe(
        services => this.services = services,
        error => this.errorMessage = error
      );
      this.k8s.get(KindTypes.BUILD_CONFIGS, 'default').subscribe(
        buildconfigs => this.buildconfigs = buildconfigs,
        error => this.errorMessage = error
      );
      this.k8s.get(KindTypes.SERVICES, 'default', 'fabric8').subscribe(
        service => this.f8Service = service,
        error => this.errorMessage = error
      );
      log.debug('hello `Kubernetes` component');
    }


    
}
