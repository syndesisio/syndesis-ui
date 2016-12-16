import { NgModule, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

// Angular Modules
import { AppState } from './app.service';
import { Logger } from './common/service/log';

// Application-Wide Components
import { DirectivesModule } from './common/directives';

// Third-Party Imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

// Logger instance
let log = Logger.get('AppModule');

/**
 * `AppModule` is the main entry point into Angular2's bootstrapping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    DirectivesModule,
    RouterModule.forRoot(ROUTES, {useHash: false})
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: (appState: AppState) => {
        return () => {
          return appState.load();
        }
      },
      deps: [ AppState ],
      multi: true
    }
  ]
})
export class AppModule {

  /**
   * Constructor.
   * @param appRef - ApplicationRef
   * @param appState - AppState
   */
  constructor(public appRef: ApplicationRef, public appState: AppState) {
    log.debug('App module created');
  }
}
