import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Logger } from '../common/service/log';
import { AppHelpers } from '../common/helpers/app';
import { Forge } from '../common/service/forge';
import { Git } from '../common/service/git';
import { Kubernetes } from '../common/service/kubernetes';

import * as URI from 'urijs';
import * as _ from 'lodash';

var log = Logger.get('Branch');

@Component({
  selector: 'branch',
  templateUrl: './branch.html'
})
export class Branch {
  teamId:string = undefined;
  projectId:string = undefined;
  branchId:string = undefined;
  path:string = undefined;
  files:any = undefined;
  file:any = undefined;
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
      this.branchId = params['branchId'];
      this.route.url.subscribe((urls) => {
        this.error = undefined;
        this.files = undefined;
        this.file = undefined;
        this.path = undefined;
        var url = _.map(urls, (segment) => segment.path).join('/') || '/';
        this.git.getPage({
          teamId: this.teamId,
          projectId: this.projectId,
          branch: this.branchId,
          path: url
        }).subscribe((data) => {
          this.path = url;
          if (_.isArray(data)) {
            this.files = data;
          } else {
            this.file = data;
            this.file.content = atob(data.content);
          }
        }, (error) => {
          this.error = error;
        });
      }, (error) => {
        this.error = error; 
      });
      if (!this.teamId || !this.projectId || !this.branchId) {
        return;
      }
  }

}
