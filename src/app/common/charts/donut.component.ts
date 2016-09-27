import {Component, ViewEncapsulation} from '@angular/core';

//import './c3.loader.ts';

declare var c3: any;
declare var d3: any;
declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'donut',
    encapsulation: ViewEncapsulation.None,
    //styles: [require('./donut.scss')],
    template: require('./donut.html')
})
export class Donut {}
