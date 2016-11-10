import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// Here were are mostly using observables instead of promises
import {Observable} from 'rxjs/Observable';

//import * as _ from 'lodash';

import {User} from './user.model';
import {IUserService} from './user.service.interface';

import {Logger} from '../common/service/log';

let log = Logger.get('UserService');

@Injectable()
export class UserService implements IUserService {

    private _users: BehaviorSubject<User[]> = new BehaviorSubject([]);
    private _recentUsers: BehaviorSubject<User[]> = new BehaviorSubject([]);
    users: Observable<User[]> = this._recentUsers.asObservable();
    errorMessage: string;
    
    private allUsers: User[];

    private usersUrl = 'app/+users/user.data.json'; // URL to JSON file
    
    
    /**
     * Constructor.
     * @param http - HTTP
     */
    constructor(private http: Http) {
        console.info("[LocalUsersService] Loaded Users from localStorage: %o", this.allUsers);
        
        this._users.next(this.allUsers);
        let ra: User[] = this.allUsers.slice(0, 4);
        this._recentUsers.next(ra);
    }
    
    
    /**
     * Creates a User using data provided by the user.
     * @param user - User
     * @return {Promise<User>} - Returns a Promise. Should perhaps return an Observable instead.
     */
    create(user: User): Promise<User> {
        // Push the new User onto the list
        this.allUsers.unshift(user);

        // Publish some events
        this._users.next(this.allUsers);
        let ra: User[] = this.allUsers.slice(0, 4);
        this._recentUsers.next(ra);
        return Promise.resolve(user);
    };
    
    
    /**
     * Deletes a User. This does not delete the User persistently. It removes
     * the User from the list of Users in this session, for now.
     * @param name - Name of the User
     * @return {Promise<void>} - Returns a Promise. Should perhaps return an Observable instead.
     */
    del(name: string): Promise<void> {
        return;
    };
    
    
    /**
     * Gets a single User by its name.
     * This should actually be by ID instead, and needs to be updated.
     * @param name - Name of the User
     * @return Promise<User> - Returns a Promise. Should perhaps return an Observable instead.
     */
    get(name: string): Promise<User> {
        let rval: User = null;
        let idx: number = 0;
        while (idx < this.allUsers.length) {
            let user: User = this.allUsers[idx];
            if (user.name === name) {
                rval = user;
                break;
            }
            idx++;
        }
        if (rval != null && idx > 0) {
            this.allUsers.splice(idx, 1);
            this.allUsers.unshift(rval);
            this._users.next(this.allUsers);
            let ra: User[] = this.allUsers.slice(0, 4);
            this._recentUsers.next(ra);
        }
        return Promise.resolve(rval);
    };


    /**
     * Updates a single User.
     * Returns a Promise. Should perhaps return an Observable instead.
     * @return Promise<User> - Returns a Promise. Should perhaps return an Observable instead.
     */
    update(user: User): Promise<User> {
        // Push the new User onto the list
        this.allUsers.unshift(user);
        
        // Publish some events
        this._users.next(this.allUsers);
        let ra: User[] = this.allUsers.slice(0, 4);
        this._recentUsers.next(ra);
        
        return Promise.resolve(user);
    };
    
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    };
    
    
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg); // log to console instead
        
        return Observable.throw(errMsg);
    };
}
