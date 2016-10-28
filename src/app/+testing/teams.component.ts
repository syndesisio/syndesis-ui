
import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Logger } from '../common/service/log';
import { Forge } from '../common/service/forge';
import { KindTypes, KubernetesAPI } from '../common/helpers/kubernetes';
import { GetOptions, Kubernetes } from '../common/service/kubernetes';

import * as URI from 'urijs';
import * as _ from 'lodash';

var log = Logger.get('+Teams');

@Component({
  selector: 'teams',
  templateUrl: './teams.html'
})
export class Teams {

  teams:any[] = undefined;
  errorMessage:any = undefined;

  constructor(private k8s:Kubernetes, private appState:AppState) {

  }

  ngOnInit() {
		var kind = KindTypes.NAMESPACES;
		if (this.appState.get('k8sProvider') === 'openshift') {
			kind = KindTypes.PROJECTS;
		}
    this.k8s.get({ 
      kind: kind
		}).subscribe(
      namespaces => this.teams = namespaces,
      error => this.errorMessage = error
    );
  }

}

