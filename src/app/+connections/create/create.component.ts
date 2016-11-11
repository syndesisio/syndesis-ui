import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';
import { Forge } from '../../common/service/forge';

var log = Logger.get('+connections/create');

@Component({
    selector: 'connections-create',
    styles: [require('./create.scss')],
    templateUrl: './create.html',
    providers: [ ConnectionService ]
})
export class Create {
    
    entity:any = {};
    command:any = undefined;
    inputList:any[] = [];
    errorMessage: string;
    projectId:string = undefined;
    
    constructor( private _connectionService: ConnectionService,
                private router:Router,
                private forge:Forge ) {
                
    }
    
    ngOnInit() {
        log.debug('hello `Connections: Create` component');
        // set up the initial form config, we default a bunch of values via hidden form fields
        this.command = {
          info: {
            id: "project-new",
            name: "Connection Details"
          },
          properties: {
            named: {
              name: 'named',
              title: 'Project Name',
              type: 'text',
              required: true,
              enabled: true
            },
            topLevelPackage: {
              name: 'topLevelPackage',
              title: 'Package',
              type: 'text',
              value: 'org.example',
              enabled: true
            },
            type: {
              name: 'type',
              title: 'Type',
              value: 'connector',
              type: 'hidden',
              enabled: true
            },
            version: {
              name: 'version',
              title: 'Version',
              value: '1.0.0',
              type: 'hidden',
              enabled: true
            },
            stack: {
              name: 'stack',
              title: 'Stack',
              value: 'None',
              type: 'hidden',
              enabled: true
            },
            overwrite: {
              name: 'overwrite',
              title: 'Overwrite',
              value: false,
              type: 'hidden',
              enabled: true
            },
            buildSystem: {
              name: 'buildSystem',
              title: 'Build System',
              value: 'Maven',
              type: 'hidden',
              enabled: true
            },
            targetLocation: {
              name: 'targetLocation',
              title: 'Target Location',
              value: '',
              type: 'hidden',
              enabled: true
            }
          } 
        };
        this.setDefaultValues(this.command, this.entity)
    }

    onSubmit(entity) {
      this.inputList.push(entity);
      this.forge.executeCommand({
        commandId: this.command.info.id,
        data: {
          namespace: 'default',
          projectName: this.projectId,
          inputList: this.inputList,
          resource: ''
        }
      }).subscribe((response) => {
        log.info("Got response: ", response);
        switch (this.command.info.id) {
          case 'project-new':
            if (response.status === 'SUCCESS') {
              this.projectId = entity.named;
              this.forge.getCommandInputs({
                teamId: 'default',
                commandId: 'ipaas-create-connector',
                projectId: this.projectId
              }).subscribe((command) => {
                this.inputList = [];
                this.command = command;
                this.entity = this.setDefaultValues(command);
              }, (error) => {
                // TODO
                this.errorMessage = error; 
              });
            } else {
              // TODO
            }
            break;
          case 'ipaas-create-connector':
            if (response.newForm) {
              this.command = response.newForm;
              this.entity = this.setDefaultValues(this.command);
              if ('canExecute' in response && !response.canExecute) {
                // TODO validation
                // toss the last input, it's not valid
                this.inputList.pop();
              }
            } else {
              // TODO
              this.router.navigate(['..']);
            }
            // TODO handle validation
            break;
          default:
            // totally broken
        }
      });
    }

    setDefaultValues(command:any, entity:any = {}) {
      var properties = <any>_.get(command, 'properties');
      _.forOwn(properties, (value, key) => {
        if ('value' in value) {
          entity[key] = value.value;
        }
      });
      return entity;
    }

    getFields(command:any) {
      var keys = _.keys(command.properties);
      var answer = [];
      _.forEach(keys, (key) => {
        var field:any = command.properties[key] || {};
        field.id = field.id || key;
        answer.push(field);
      });
      return answer;
    }

    
    
}
