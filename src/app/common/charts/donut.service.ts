import {Injectable} from '@angular/core';

@Injectable()
export class DonutService {
    
    //constructor(private _baConfig:BaThemeConfigProvider) {}
    
    constructor(public config:Object) {}
    
    getData() {
        //let donutColor = this._baConfig.get().colors.custom.dashboardDonutChart;
        
        return [
            {
                //color: donutColor,
                description: 'New Visits',
                stats: '57,820',
                icon: 'person',
            }, {
                //color: donutColor,
                description: 'Purchases',
                stats: '$ 89,745',
                icon: 'money',
            }, {
                //color: donutColor,
                description: 'Active Users',
                stats: '178,391',
                icon: 'face',
            }, {
                //color: donutColor,
                description: 'Returned',
                stats: '32,592',
                icon: 'refresh',
            }
        ];
    }
}
