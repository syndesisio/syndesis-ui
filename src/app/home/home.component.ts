import {Component} from '@angular/core';

import {AppState} from '../app.service';
import {Title} from '../common/title';

declare var c3: any;
declare var d3: any;
declare var $: any;

require('./home.scss');

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title
    ],
    styles: [require('./home.scss')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.html'
})
export class Home {
    // Set our default values
    localState = {value: ''};
    // TypeScript public modifiers
    constructor(public appState: AppState, public title: Title) {
        
    }
    
    ngOnInit() {
        console.log('hello `Home` component');
        // this.title.getData().subscribe(data => this.data = data);
        
        ///////
    
        var donutConfig = $().c3ChartDefaults().getDefaultDonutConfig('A');
        donutConfig.bindto = '#chart-pf-donut-1';
        donutConfig.color =  {
            pattern: ["#cc0000","#D1D1D1"]
        };
        donutConfig.data = {
            type: "donut",
            columns: [
                ["Used", 95],
                ["Available", 5]
            ],
            groups: [
                ["used", "available"]
            ],
            order: null
        };
        donutConfig.tooltip = {
            contents: function (d) {
                return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                  Math.round(d[0].ratio * 100) + '%' + ' MHz ' + d[0].name +
                  '</span>';
            }
        };
    
        // Chart 1
        c3.generate(donutConfig);
        var donutChartTitle = d3.select("#chart-pf-donut-1").select('text.c3-chart-arcs-title');
        donutChartTitle.text("");
        donutChartTitle.insert('tspan').text("950").classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
        donutChartTitle.insert('tspan').text("MHz Used").classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
    
        var sparklineConfig = $().c3ChartDefaults().getDefaultSparklineConfig();
        sparklineConfig.bindto = '#chart-pf-sparkline-1';
        sparklineConfig.data = {
            columns: [
                ['%', 10, 50, 28, 20, 31, 27, 60, 36, 52, 55, 62, 68, 69, 88, 74, 88, 95],
            ],
            type: 'area'
        };
        
        
        // Sparkline Chart 2
        c3.generate(sparklineConfig);
        
        
        ////////
    
        var donutConfig = $().c3ChartDefaults().getDefaultDonutConfig('A');
        donutConfig.bindto = '#chart-pf-donut-3';
        donutConfig.color =  {
            pattern: ["#EC7A08","#D1D1D1"]
        };
        donutConfig.data = {
            type: "donut",
            columns: [
                ["Used", 85],
                ["Available", 15]
            ],
            groups: [
                ["used", "available"]
            ],
            order: null
        };
        donutConfig.tooltip = {
            contents: function (d) {
                return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                  Math.round(d[0].ratio * 100) + '%' + ' Gbps ' + d[0].name +
                  '</span>';
            }
        };
    
        // Donut Chart 5
        
        c3.generate(donutConfig);
        var donutChartTitle = d3.select("#chart-pf-donut-3").select('text.c3-chart-arcs-title');
        donutChartTitle.text("");
        donutChartTitle.insert('tspan').text("1100").classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
        donutChartTitle.insert('tspan').text("Gbps Used").classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
    
        var sparklineConfig = $().c3ChartDefaults().getDefaultSparklineConfig();
        sparklineConfig.bindto = '#chart-pf-sparkline-3';
        sparklineConfig.data = {
            columns: [
                ['%', 60, 55, 70, 44, 31, 67, 54, 46, 58, 75, 62, 68, 69, 88, 74, 88, 85],
            ],
            type: 'area'
        };
        
        
        // Sparkline Chart 6
        
        c3.generate(sparklineConfig);
        
        
        
        ///////
    
        var c3ChartDefaults = $().c3ChartDefaults();
    
        var donutConfig = c3ChartDefaults.getDefaultDonutConfig('A');
        
        donutConfig.bindto = '#chart-pf-donut-4';
        
        donutConfig.color =  {
            pattern: ["#EC7A08","#D1D1D1"]
        };
        
        donutConfig.data = {
            type: "donut",
            columns: [
                ["Used", 85],
                ["Available", 15]
            ],
            groups: [
                ["used", "available"]
            ],
            order: null
        };
        
        donutConfig.tooltip = {
            contents: function (d) {
                return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                  Math.round(d[0].ratio * 100) + '%' + ' Gbps ' + d[0].name +
                  '</span>';
            }
        };
    
        // Donut Chart 1
        c3.generate(donutConfig);
        var donutChartTitle = d3.select("#chart-pf-donut-4").select('text.c3-chart-arcs-title');
        donutChartTitle.text("");
        donutChartTitle.insert('tspan').text("1100").classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
        donutChartTitle.insert('tspan').text("Gbps Used").classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
    
    
        // Sparkline Chart 2
        var sparklineConfig = c3ChartDefaults.getDefaultSparklineConfig();
        sparklineConfig.bindto = '#chart-pf-sparkline-4';
        sparklineConfig.data = {
            columns: [
                ['%', 60, 55, 70, 44, 31, 67, 54, 46, 58, 75, 62, 68, 69, 88, 74, 88, 85],
            ],
            type: 'area'
        };
        
        c3.generate(sparklineConfig);
        
        
        ///////
    
    
        // Donut Chart 3
        var donutConfig = $().c3ChartDefaults().getDefaultDonutConfig('A');
        donutConfig.bindto = '#chart-pf-donut-2';
        donutConfig.color =  {
            pattern: ["#3f9c35","#D1D1D1"]
        };
        donutConfig.data = {
            type: "donut",
            columns: [
                ["Used", 41],
                ["Available", 59]
            ],
            groups: [
                ["used", "available"]
            ],
            order: null
        };
        donutConfig.tooltip = {
            contents: function (d) {
                return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                  Math.round(d[0].ratio * 100) + '%' + ' GB ' + d[0].name +
                  '</span>';
            }
        };
    
        c3.generate(donutConfig);
        
        
        var donutChartTitle = d3.select("#chart-pf-donut-2").select('text.c3-chart-arcs-title');
        donutChartTitle.text("");
        donutChartTitle.insert('tspan').text("176").classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
        donutChartTitle.insert('tspan').text("GB Used").classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
    
        var sparklineConfig = $().c3ChartDefaults().getDefaultSparklineConfig();
        sparklineConfig.bindto = '#chart-pf-sparkline-2';
        sparklineConfig.data = {
            columns: [
                ['%', 35, 36, 20, 30, 31, 22, 44, 36, 40, 41, 55, 52, 48, 48, 50, 40, 41],
            ],
            type: 'area'
        };
        
        // Sparkline Chart 4
        c3.generate(sparklineConfig);
    }
    
    submitState(value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }
}
