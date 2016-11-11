import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../../common/service/log';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

Logger.get('Profile').debug('`Profile` component loaded asynchronously');

@Component({
    selector: 'profile',
    styles: [ `
  ` ],
    template: `
    <h1>Profile</h1>
    <div>
      Donec ullamcorper nulla non metus auctor fringilla. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
    </div>
    <div>
      <h3>
        Condimentum Ullamcorper Nullam
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
  `
})
export class Profile {
    localState;

    /**
     * Constructor.
     * @param route - ActivatedRoute
     */
    constructor(public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route
          .data
          .subscribe((data: any) => {
              // your resolved data from route
              this.localState = data.yourData;
          });

        console.log('hello `Profile` component');
    }

}
