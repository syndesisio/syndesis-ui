import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../common/service/log';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

Logger.get('Templates').debug('`Templates` component loaded asynchronously');

@Component({
    selector: 'templates',
    styles: [ `
  ` ],
    template: `
    <h1>Templates</h1>
    <div>
      Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum.
    </div>
    <div>
      <h3>
        Vulputate Fermentum Nullam
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
  `
})
export class Templates {
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

        console.log('hello `Templates` component');
    }

}
