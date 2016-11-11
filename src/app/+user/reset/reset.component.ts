import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../../common/service/log';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

Logger.get('Reset').debug('`Reset` component loaded asynchronously');

@Component({
    selector: 'reset',
    styles: [ `
  ` ],
    template: `
    <h1>Reset</h1>
    <div>
      Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui.
    </div>
    <div>
      <h3>
        Malesuada Fringilla
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
  `
})
export class Reset {
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

        console.log('hello `Reset` component');
    }

}
