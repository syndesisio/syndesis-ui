import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../common/service/log';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

Logger.get('User').debug('`User` component loaded asynchronously');

@Component({
    selector: 'user',
    styles: [ require('./user.scss') ],
    templateUrl: './user.html'
})
export class User {
    localState;

    /**
     * Constructor.
     * @param route - ActivatedRoute
     */
    constructor(public route: ActivatedRoute) {}

    ngOnInit() {
        this.route
          .data
          .subscribe((data: any) => {
              // your resolved data from route
              this.localState = data.yourData;
          });

        console.log('hello `User` component');
    }

}
