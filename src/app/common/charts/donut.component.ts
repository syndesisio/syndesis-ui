import {Component, ViewEncapsulation} from '@angular/core';

import {DonutService} from './donut.service';

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
export class Donut {
    
    public charts: Array<Object>;
    private _init = false;
    
    constructor(private _donutService: DonutService) {
        this.charts = this._donutService.getData();
    }
    
    ngAfterViewInit() {
        if (!this._init) {
            this._loadDonutCharts();
            this._updateDonutCharts();
            this._init = true;
        }
    }
    
    private _loadDonutCharts() {
        let donutConfig = $().c3ChartDefaults().getDefaultDonutConfig('A');
        
        /*
        jQuery('.chart').each(function () {
            let chart = jQuery(this);
            chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    jQuery(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: jQuery(this).attr('data-rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 9,
                lineCap: 'round',
            });
        });
        */
    }
    
    private _updateDonutCharts() {
        let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };
        
        jQuery('.pie-charts .chart').each(function(index, chart) {
            jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
        });
    }
}
