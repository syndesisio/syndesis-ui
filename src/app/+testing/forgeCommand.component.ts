import { Component, Input } from '@angular/core';
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
    private stepId:string = undefined;

    private command:any = undefined;
    private entity:any = {};
    private response:any = undefined;

    private error:any = undefined;
    private formErrors:any[] = undefined;
    teamId:string = undefined;
    projectId:string = undefined;

    private ready = false;

    constructor(private forge:Forge, 
                private k8s:Kubernetes,
                private route:ActivatedRoute,
                private router:Router) {

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
      this.ready = false;
      this.formErrors = undefined;
      // this is the input values for the command, 'inputList' is the form values
      var args = {
        namespace: this.teamId,
        projectName: this.projectId,
        inputList: [],
        resource: ""
      };
      args.inputList.push(entity);
      // first validate the user input for the command
      this.forge.validateCommandInputs({
        commandId: this.commandId,
        data: args
      }).subscribe((response) => {
        log.debug("Got back response from validation: ", response);
        if (response.canExecute) {
          // execute the command if the values are okay
          this.forge.executeCommand({
            commandId: this.commandId,
            data: args
          }).subscribe((response) => {
            log.debug("Got back response from execute: ", response);
            this.ready = true;
            this.response = response;
          }, (error) => {
            this.ready = true;
            this.error = error;
          });
        } else {
          this.ready = true;
          if (response.messages.length) {
            this.formErrors = response.messages;
            return;
          } else {
            this.forge.executeCommand({
              commandId: this.commandId,
              data: args
            }).subscribe((response) => {
              log.debug("Got back response from execute: ", response);
              this.ready = true;
              this.response = response;
            }, (error) => {
              this.ready = true;
              this.error = error;
            });
          }
          /*
          if (response.wizardResults) {
            // it's a wizard, maybe we need the next page
            this.router.navigate([response.wizardResults.stepInputs.length], { relativeTo: this.route });
            
          }
          */
        }
      }, (error) => {
        this.ready = true;
        this.error = error;
        log.debug("Got back error validating: ", error); 
      });
      log.debug("On submit, got form: ", entity);
    }

    ngOnInit() {
      this.route.url.subscribe((urls) => {
        this.ready = false;
        this.error = undefined;
        var params = AppHelpers.allRouteParams(this.route);
        this.commandId = params['commandId'];
        this.teamId = params['teamId'];
        this.projectId = params['projectId'];
        this.stepId = params['stepId'];
        if (!this.stepId) {
          this.router.navigate(['0'], { relativeTo: this.route });
          return;
        }
        if (!this.commandId) {
          return;
        }
        var options = <CommandOptions> {
          commandId: this.commandId
        };
        if (this.teamId && this.projectId) {
          options.teamId = this.teamId;
          options.projectId = this.projectId;
        }
        log.debug("Using options: ", options);
        if (this.stepId === '0') {
          this.forge.getCommandInputs(options).subscribe(
            (command) => {
              this.command = command
              _.forOwn(this.command.properties, (value, key) => {
                if (value.value) {
                  this.entity[key] = value.value;
                }
              });
              this.ready = true;
            },
            (error) => {
              this.ready = true;
              this.error = error
            });
        } else {

        }
      }, (error) => {
        this.ready = true;
        this.error = error;
      });
    }
}
