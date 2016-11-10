//import {OpaqueToken} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from './user.model';
//import {User} from '../+user/user.model'; // Setup for Auth

export interface IUserService {
    /**
     * Creates a new User with the given information. This will store the User in whatever
     * storage is used by this service. It will return a Promise that the caller can
     * use to be notified when the User has been successfully stored.
     * @param user - Instance of a User
     * @return Promise<User> - Returns a Promise. Should perhaps return an Observable instead.
     */
    create(user: User): Promise<User>;
    
    /**
     * Called to delete a User.  This is done asynchronously and thus returns a promise.
     * @param name - Name of the User.
     * @return Promise<User> - Returns a Promise. Should perhaps return an Observable instead.
     */
    del(name: string): Promise<void>;
    
    /**
     * Gets a single User by its name. Returns a Promise.
     * @param name - Name of the User.
     * @return Promise<User> -  Returns a Promise. Should perhaps return an Observable instead.
     */
    get(name: string): Promise<User>;

    /**
     * Updates an existing User with the associated name. It will return a Promise that the
     * caller can use to be notified when the User has been successfully stored.
     * @param user - Instance of a User.
     * @return Promise<User> - Returns a Promise. Should perhaps return an Observable instead.
     */
    update(user: User): Promise<User>;
}
