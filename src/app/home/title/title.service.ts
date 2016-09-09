import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class Title {
    value = 'Hawtio iPaaS';
    
    constructor(public http: Http) {
        
    }
    
    getData() {
        console.log('Title#getData(): Get Data');
        // return this.http.get('/assets/data.json')
        // .map(res => res.json());
        return {
            value: 'Hawtio iPaaS'
        };
    }
}
