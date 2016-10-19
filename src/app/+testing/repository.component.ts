import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Logger } from '../common/service/log';
import { AppHelpers } from '../common/helpers/app';
import { Forge } from '../common/service/forge';
import { Git } from '../common/service/git';
import { Kubernetes } from '../common/service/kubernetes';

import * as URI from 'urijs';
import * as _ from 'lodash';

@Component({
  selector: 'repository',
  templateUrl: './repository.html'
})
export class Repository {
  teamId:string = undefined;
  projectId: string = undefined;
  branches:string[] = undefined;
  error:any = undefined;

  constructor(private forge:Forge,
              private git:Git,
              private k8s:Kubernetes,
              private route:ActivatedRoute,
              private router:Router) {

  }

  ngOnInit() {
      var params = AppHelpers.allRouteParams(this.route);
      this.teamId = params['teamId'];
      this.projectId = params['projectId'];
      if (!this.teamId || !this.projectId) {
        return;
      }
      this.git.branches({
        teamId: this.teamId,
        projectId: this.projectId
      }).subscribe((branches) => {
        this.branches = branches;
      }, (error) => {
        this.error = error;
      });
  }

}
