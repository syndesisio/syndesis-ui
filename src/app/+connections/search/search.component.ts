import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {ConnectionService} from '../connection.service';
import {Connection} from '../connection.model';

import {Logger} from '../../common/service/log';

var log = Logger.get('+connections/search');

@Component({
    moduleId: module.id,
    selector: 'connection-search',
    templateUrl: 'search.component.html',
    providers: [ConnectionService]
})
export class Search implements OnInit {
    connections: Observable<Connection[]>;
    private searchTerms = new Subject<string>();
    
    constructor(private connectionService: ConnectionService,
                private router: Router) {
    }
    
    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }
    
    ngOnInit(): void {
        this.connections = this.searchTerms
          .debounceTime(300)        // wait for 300ms pause in events
          .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => term   // switch to new observable each time
            // return the http search observable
            ? this.connectionService.search(term)
            // or the observable of empty connections if no search term
            : Observable.of<Connection[]>([]))
          .catch(error => {
              // TODO: real error handling
              console.log(error);
              return Observable.of<Connection[]>([]);
          });
    }
    
    gotoDetail(connection: Connection): void {
        let link = ['/detail', connection.id];
        this.router.navigate(link);
    }
}

