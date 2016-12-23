//import { OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ITemplate } from './template.model';
//import { IUser } from '../+user/user.model'; // Setup for Auth

export interface ITemplateService {
    /**
     * Creates a new Template with the given information.
     * @param template - Instance of a Template
     * @return Observable<Template> - Returns an Observable.
     */
    create(template: ITemplate): Observable<ITemplate>;

    /**
     * Called to delete a Template.
     * @param id - ID of the Template.
     * @return Observable<void> - Returns an Observable.
     */
    del(id: number): Observable<void>;

    /**
     * Gets a single Template by its name.
     * @param id - ID of the Template.
     * @return Observable<ITemplate> - Returns an Observable.
     */
    get(id: number): Observable<ITemplate>;

    /**
     * Gets an observable over all of the Templates. The list of Templates is not guaranteed
     * to be in any particular order. The resulting observer can be used to watch for
     * changes to the list of Templates.
     * @return Observable<Template[]> - Returns an Observable.
     */
    getAll(): Observable<ITemplate[]>;

    /**
     * Gets an observable over the recently updated Templates. Callers can then subscribe to this
     * observable to be notified when the value changes.
     *
     * @return Observable<ITemplate[]> - Returns an Observable.
     */
    getRecent(): Observable<ITemplate[]>;

    /**
     * Updates an existing Template with the associated name. It will return a Promise that the
     * caller can use to be notified when the Template has been successfully stored.
     * @param template - Instance of a Template.
     * @return Observable<ITemplate> - Returns an Observable.
     */
    update(template: ITemplate): Observable<ITemplate>;
}
