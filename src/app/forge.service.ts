import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { AppState } from './app.service';
import { Logger } from './log.service';
import { AppHelpers } from './app.helpers';

var log = Logger.get('Forge');

@Injectable()
export class Forge {

  private url:string = undefined;

  constructor(private http: Http, private appState: AppState) {
    this.url = appState.config.urls['FABRIC8_FORGE'];
    log.debug("Forge service using URL: ", this.url);
  }

  /*
   * Get the inputs for a given command ID
   * TODO add project/namespace parameters
   */
  getCommandInputs(commandId:string):Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      return this.http.get(this.url + '/commandInput/' + commandId)
                      .map((res:Response) => {
                        log.debug("Got response: ", res.json());
                        return res.json();
                      })
                      .catch((error) => {
                        log.error("Error fetching command inputs for command " + commandId + ": ", error)
                        return error;
                      });
    }, {});

  };

  /*
   * Get all the commands available without a project
   * TODO add project/namespace parameters
   */
  getCommands():Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      return this.http.get(this.url + '/commands')
                      .map((res:Response) => {
                        var body = <any[]> res.json();
                        var commandMap = {
                          names: [],
                          commands: {}
                        };
                        if (_.isArray(body)) {
                          log.debug("Received body: ", body);
                          // no point showing disabled commands
                          body = _.filter(body, (item:any) => item.enabled);
                          _.forEach(body, (item:any) => {
                            var category = <string>_.get(item, 'category') || 'Uncategorized';
                            var commands = <any[]>_.get(commandMap.commands, category);
                            if (!commands) {
                              commandMap.names.push(category);
                              commandMap.names.sort();
                              commands = [item];
                            } else {
                              commands.push(item);
                              commands = _.sortBy(commands, 'name');
                            }
                            commandMap.commands[category] = commands;
                          });
                        } else {
                          log.warn("Expected to receive array, but instead got: ", body);
                        }
                        return commandMap;
                      })
                      .catch((error) => {
                        log.error("Error fetching commands: ", error)
                        return error;
                      });
    }, []);
  }

}

