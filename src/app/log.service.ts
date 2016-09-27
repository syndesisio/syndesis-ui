import { Injectable } from '@angular/core';

import { AppState } from './app.service';

export var Logger = require('js-logger');
Logger.useDefaults();

/*
 * Logging service to get an instance of a logger
 */
@Injectable()
export class LogConfig {

  constructor(private appState: AppState) {
    // TODO set this via AppState, ideally per-logger
    Logger.setLevel(Logger.DEBUG);
  }
}
