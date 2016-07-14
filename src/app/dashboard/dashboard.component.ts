import {Component, OnInit} from 'angular2/core';
import {AppState} from '../app.service';

import {Title} from './title';
import {XLarge} from './x-large';

declare var c3:any;
declare var $:any;


@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    selector: 'dashboard',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title
    ],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [
        XLarge
    ],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [require('./dashboard.scss')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./dashboard.html')
})
export class Dashboard implements OnInit {
    // Set our default values
    localState = '';
    pageTitle: string = 'Dashboard';

    // TypeScript public modifiers
    constructor(public appState:AppState, public title:Title) {

    }

    ngOnInit() {
        console.log('Loaded `Dashboard` component');
        // this.title.getData().subscribe(data => this.data = data);

        c3.generate({
            axis: {
                x: {
                    tick: {
                        format: '%m-%d',
                        outer: false
                    },
                    type: 'timeseries'
                },
                y: {
                    tick: {
                        format: function(d) { return d + '%'; },
                        outer: false
                    }
                }
            },
            bindto: '#chart',
            //color: '',
            data: {
                columns: [
                    ['x', '2015-04-01', '2015-04-02', '2015-04-03', '2015-04-04', '2015-04-05', '2015-04-06', '2015-04-07'],
                    ['data1', 16, 44, 33, 88, 50, 76, 21]
                ],
                x: 'x'
            },
            grid: {
                y: {
                    show: true
                }
            },
            legend: {
                hide: true
            },
            point: {
                r: 4
            },
            size: {
                height: 220
            }
        });

        var donutChartConfig: any = {};

        donutChartConfig.bindto = '#chart2';
        donutChartConfig.tooltip = {show: true};
        donutChartConfig.data = {
            /*
            colors: {
                Cloud: '#006e9c',
                Virtual: '#00a8e1',
                Baremetal: '#969696'
            },
            */
            columns: [
                ['Cloud', 4,828],
                ['Virtual', 13,258],
                ['Baremetal', 11,1124]
            ],
            type : 'donut',
            onclick: function (d, i) { console.log('onclick', d, i); },
            onmouseover: function (d, i) { console.log('onmouseover', d, i); },
            onmouseout: function (d, i) { console.log('onmouseout', d, i); }
        };

        c3.generate(donutChartConfig);

        c3.generate({
            axis: {
                rotated: true,
                x: {
                    categories: ['Location 1', 'Location 2', 'Location 3', 'Location 4'],
                    tick: {
                        outer: false
                    },
                    type: 'category'
                },
                y: {
                    tick: {
                        format: function(d) { return d + '%'; },
                        outer: false
                    }
                }
            },
            bindto: '#chart4',
            //color: '',
            data: {
                columns: [
                    ['Virtual Resources', 25, 35, 18, 78],
                    ['Physical Resources', 60, 40, 48, 8]
                ],
                groups: [
                    ['Virtual Resources', 'Physical Resources']
                ],
                type: 'bar'
            },
            grid: {
                y: {
                    show: true
                }
            },
            size: {
                height: 200
            }
        });
    }

    submitState(value) {
        console.log('submitState', value);
        this.appState.set('value', value);
    }

}
