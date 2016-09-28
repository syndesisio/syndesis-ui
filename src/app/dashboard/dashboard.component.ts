import {Component} from '@angular/core';

import {AppState} from '../app.service';

declare const c3: any;
declare const d3: any;
declare const $: any;
declare const jQuery: any;

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    selector: 'dashboard',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [],
    styles: [ require('./dashboard.scss') ],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './dashboard.html'
})
export class Dashboard {
    // Set our default values
    localState = '';
    
    // TypeScript public modifiers
    constructor(public appState: AppState) {}
    
    ngOnInit() {
        console.log('Loaded `Dashboard` component');
    
        var donutChartConfig = jQuery().c3ChartDefaults().getDefaultDonutConfig('A');
        
        donutChartConfig.bindto = '#chart-pf-donut-1';
        
        donutChartConfig.data = {
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
        
        donutChartConfig.color = {
            pattern: ["#cc0000", "#D1D1D1"]
        };
        
        donutChartConfig.tooltip = {
            contents: function(d) {
                return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                  Math.round(d[0].ratio * 100) + '%' + ' MHz ' + d[0].name +
                  '</span>';
            }
        };
        
        var chart1 = c3.generate(donutChartConfig);
    
        var donutChartTitle = d3.select("#chart-pf-donut-1").select('text.c3-chart-arcs-title');
        
        donutChartTitle.text("");
        
        donutChartTitle.insert('tspan').text("950").classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
        donutChartTitle.insert('tspan').text("MHz Used").classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
    
        var sparklineChartConfig = jQuery().c3ChartDefaults().getDefaultSparklineConfig();
        
        sparklineChartConfig.bindto = '#chart-pf-sparkline-1';
        
        sparklineChartConfig.data = {
            columns: [
                ['%', 10, 50, 28, 20, 31, 27, 60, 36, 52, 55, 62, 68, 69, 88, 74, 88, 95],
            ],
            type: 'area'
        };
        
        var chart2 = c3.generate(sparklineChartConfig);
        
        ////
    
    
        var donutChartConfig = jQuery().c3ChartDefaults().getDefaultDonutConfig('A');
        
        donutChartConfig.bindto = '#chart-pf-donut-2';
        
        donutChartConfig.data = {
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
        
        donutChartConfig.color = {
            pattern: ["#3f9c35", "#D1D1D1"]
        };
        
        donutChartConfig.tooltip = {
            contents: function(d) {
                return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                  Math.round(d[0].ratio * 100) + '%' + ' GB ' + d[0].name +
                  '</span>';
            }
        };
        
        var chart3 = c3.generate(donutChartConfig);
    
        var donutChartTitle = d3.select("#chart-pf-donut-2").select('text.c3-chart-arcs-title');
        
        donutChartTitle.text("");
        donutChartTitle.insert('tspan').text("176").classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
        donutChartTitle.insert('tspan').text("GB Used").classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
    
        var sparklineChartConfig = jQuery().c3ChartDefaults().getDefaultSparklineConfig();
        
        sparklineChartConfig.bindto = '#chart-pf-sparkline-2';
        
        sparklineChartConfig.data = {
            columns: [
                ['%', 35, 36, 20, 30, 31, 22, 44, 36, 40, 41, 55, 52, 48, 48, 50, 40, 41],
            ],
            type: 'area'
        };
        
        var chart4 = c3.generate(sparklineChartConfig);
        
        
        ////
    
    
        var donutChartConfig = jQuery().c3ChartDefaults().getDefaultDonutConfig('A');
        
        donutChartConfig.bindto = '#chart-pf-donut-3';
        
        donutChartConfig.data = {
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
        
        donutChartConfig.color = {
            pattern: ["#EC7A08", "#D1D1D1"]
        };
        
        donutChartConfig.tooltip = {
            contents: function(d) {
                return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                  Math.round(d[0].ratio * 100) + '%' + ' Gbps ' + d[0].name +
                  '</span>';
            }
        };
        
        var chart5 = c3.generate(donutChartConfig);
    
        var donutChartTitle = d3.select("#chart-pf-donut-3").select('text.c3-chart-arcs-title');
        
        donutChartTitle.text("");
        donutChartTitle.insert('tspan').text("1100").classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
        donutChartTitle.insert('tspan').text("Gbps Used").classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
    
        var sparklineChartConfig = jQuery().c3ChartDefaults().getDefaultSparklineConfig();
        
        sparklineChartConfig.bindto = '#chart-pf-sparkline-3';
        
        sparklineChartConfig.data = {
            columns: [
                ['%', 60, 55, 70, 44, 31, 67, 54, 46, 58, 75, 62, 68, 69, 88, 74, 88, 85],
            ],
            type: 'area'
        };
        
        var chart6 = c3.generate(sparklineChartConfig);
        
        
        ////
    }
    
    submitState(value) {
        console.log('submitState', value);
        this.appState.set('value', value);
    }
}
