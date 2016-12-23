//import { OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IIntegration } from './integration.model';
//import { IUser } from '../+user/user.model'; // Setup for Auth

export interface IIntegrationService {
  /**
   * Creates a new Integration with the given information.
   * @param integration - Instance of a Integration
   * @return Observable<Integration> - Returns an Observable.
   */
  create(integration: IIntegration): Observable<IIntegration>;

  /**
   * Called to delete a Integration.
   * @param id - ID of the Integration.
   * @return Observable<void> - Returns an Observable.
   */
  del(id: number): Observable<void>;

  /**
   * Gets a single Integration by its name.
   * @param id - ID of the Integration.
   * @return Observable<IIntegration> - Returns an Observable.
   */
  get(id: number): Observable<IIntegration>;

  /**
   * Gets an observable over all of the Integrations. The list of Integrations is not guaranteed
   * to be in any particular order. The resulting observer can be used to watch for
   * changes to the list of Integrations.
   * @return Observable<Integration[]> - Returns an Observable.
   */
  getAll(): Observable<IIntegration[]>;

  /**
   * Gets an observable over the recently updated Integrations. Callers can then subscribe to this
   * observable to be notified when the value changes.
   *
   * @return Observable<IIntegration[]> - Returns an Observable.
   */
  getRecent(): Observable<IIntegration[]>;

  /**
   * Updates an existing Integration with the associated name. It will return a Promise that the
   * caller can use to be notified when the Integration has been successfully stored.
   * @param integration - Instance of a Integration.
   * @return Observable<IIntegration> - Returns an Observable.
   */
  update(integration: IIntegration): Observable<IIntegration>;
}
