import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {Connection} from '../connection.model';
import {ConnectionService} from '../connection.service';

import {Logger} from '../../common/service/log';
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
    errorMessage: string;
    
    constructor( private connectionService: ConnectionService,
                private forge:Forge ) {
                
    }
    
    ngOnInit() {
        log.debug('hello `Connections: Create` component');
        this.command = {
          info: {
            name: "Connection Details"
          },
          properties: {
            named: {
              name: 'named',
              title: 'Connection Name',
              type: 'text',
              required: true
            },
            topLevelPackage: {
              name: 'topLevelPackage',
              title: 'Package',
              type: 'text',
              value: 'org.example'
            },
            type: {
              name: 'type',
              title: 'Type',
              value: 'connector',
              type: 'hidden'
            }
          } 
        };
        this.setDefaultValues(this.command, this.entity)
        /*
        this.forge.getCommandInputs({
          teamId: 'default',
          commandId: 'project-new'
        }).subscribe(
          (command) => {
            this.command = command;
            this.entity = this.setDefaultValues(command);
          },
          (error) => {
            this.errorMessage = error;
          });
          */
    }

    onSubmit(entity) {

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
