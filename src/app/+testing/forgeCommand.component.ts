import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { AppHelpers } from '../common/helpers/app';
import { Logger } from '../common/service/log';
import { Forge, CommandOptions } from '../common/service/forge';
import { Kubernetes } from '../common/service/kubernetes';

var log = Logger.get('+Forge');

@Component({
    selector: 'forge-command',
    templateUrl: './forgeCommand.html'
})
/*
 * Component that shows the inputs for a given forge command ID
 */
export class ForgeCommand {

    private commandId:string = undefined;

    private command:any = undefined;
    private entity:any = {};
    private inputList:any[] = [];
    private response:any = undefined;
    private result:any = undefined;

    private error:any = undefined;
    private formErrors:any[] = undefined;
    teamId:string = undefined;
    projectId:string = undefined;

    private ready = false;

    constructor(private forge:Forge, 
                private k8s:Kubernetes,
                private route:ActivatedRoute,
                private router:Router,
                private cdr:ChangeDetectorRef) {

    }

    getFields(command:any) {
      var keys = _.keys(command.properties);
      var answer = [];
      _.forEach(keys, (key) => {
        var field:any = command.properties[key] || {};
        field.id = key;
        answer.push(field);
      });
      return answer;
    }

    onSubmit(entity:any) {
      this.inputList.push(this.entity);
      this.ready = false;
      // hide the form
      this.command.properties = undefined;
      this.response = undefined;
      this.formErrors = undefined;
      // this is the input values for the command, 'inputList' is the form values
      var args = <any> {
        inputList: this.inputList,
        resource: ""
      };
      if (this.teamId) {
        args.namespace = this.teamId;
      }
      if (this.projectId) {
        args.projectName = this.projectId;
      }
      // execute the forge command, either we'll get back validation errors or the command result *or* more forms
      this.forge.executeCommand({
        commandId: this.commandId,
        data: args
      }).subscribe((response) => {
        this.response = response;
        if (response.status === "SUCCESS" && response.commandCompleted) {
          // hide the form
          this.result = {
            response: response,
            inputs: this.inputList
          };
          this.ready = true;
          this.cdr.detectChanges();
          return;
        }

        let stepInputs = <any[]>_.get(response, 'wizardResults.stepInputs');
        if (response.status === "SUCCESS" && response.canMoveToNextStep) {
          // we've a wizard on our hands
          this.command = _.last(stepInputs);
          this.entity = this.setDefaultValues(this.command);
        } else if (_.get(response, 'wizardResults.stepInputs.length')) {
          // we've gotten a new form
          this.command.properties = _.get(_.last(stepInputs), 'properties');
          this.inputList.pop();
        } else {
          // hide the form
          this.result = {
            response: response,
            inputs: this.inputList
          };
        }
        this.ready = true;
        this.cdr.detectChanges();
      }, (error) => {
        this.ready = true;
        this.error = error;
      });
    }

    setDefaultValues(command:any, entity:any = {}) {
      var properties = <any>_.get(command, 'properties');
      _.forOwn(properties, (value, key) => {
        if (value.value) {
          entity[key] = value.value;
        }
      });
      return entity;
    }

    ngOnInit() {
      this.route.url.subscribe((urls) => {
        this.ready = false;
        this.error = undefined;
        var params = AppHelpers.allRouteParams(this.route);
        this.commandId = params['commandId'];
        this.teamId = params['teamId'];
        this.projectId = params['projectId'];
        if (!this.commandId) {
          return;
        }
        var options = <CommandOptions> {
          commandId: this.commandId
        };
        if (this.teamId) {
          options.teamId = this.teamId;
        }
        if (this.projectId) {
          options.projectId = this.projectId;
        }
        log.debug("Using options: ", options);
        this.forge.getCommandInputs(options).subscribe(
          (command) => {
            this.command = command
            this.entity = this.setDefaultValues(command);
            this.ready = true;
          },
          (error) => {
            this.ready = true;
            this.error = error
          });
      }, (error) => {
        this.ready = true;
        this.error = error;
      });
    }
}
