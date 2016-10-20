import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {Connection} from '../connection.model';
import {ConnectionService} from '../connection.service';

import {Logger} from '../../common/service/log';

var log = Logger.get('+connections/detail');

@Component({
    moduleId: module.id,
    selector: 'connections-detail',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./detail.scss')],
    templateUrl: './detail.html',
    providers: [ ConnectionService ]
})
export class Detail implements OnInit {
    
    connection: Connection;
    errorMessage: string;
    
    constructor(private connectionService: ConnectionService,
                private route: ActivatedRoute,
                private location: Location) {}
    
    ngOnInit(): void {
        log.debug('hello `Connections: Detail` component');
    }
    
    save(): void {}
    
    goBack(): void {}
    
}

