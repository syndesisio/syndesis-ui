import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Logger } from '../common/service/log';
import { Forge } from '../common/service/forge';
import { KindTypes, KubernetesAPI } from '../common/helpers/kubernetes';
import { GetOptions, Kubernetes } from '../common/service/kubernetes';

import * as URI from 'urijs';
import * as _ from 'lodash';

@Component({
  selector: 'team',
  templateUrl: './team.html'

})
export class Team {
 
  id:string = undefined;
  projects:any[] = undefined;
  errorMessage:any = undefined;

  constructor(private k8s:Kubernetes,
              private route:ActivatedRoute,
              private router:Router) {

  }


  ngOnInit() {
      this.route.params.forEach((params:Params) => {
        this.id = params['teamId'];
      });
      if (!this.id) {
        return;
      }
    this.k8s.get({ 
      namespace: this.id,
      kind: KindTypes.BUILD_CONFIGS, 
    }).subscribe(
      buildConfigs => this.projects = buildConfigs,
      error => this.errorMessage = error
    );
  }

}


