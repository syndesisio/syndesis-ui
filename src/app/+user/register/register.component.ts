import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../../common/service/log';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

Logger.get('Register').debug('`Register` component loaded asynchronously');

@Component({
    selector: 'register',
    styleUrls: [],
    template: `
    <h1>Register</h1>
    <div>
      Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.
    </div>
    <div>
      <h3>
        Fusce Ridiculus Consectetur
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
  `
})
export class Register {
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

        console.log('hello `Register` component');
    }

}
