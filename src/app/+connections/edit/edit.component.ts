import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../app.service';
import { Subscription } from 'rxjs/Subscription';

// Components
import { IComponent } from '../component.model';
import { ComponentService } from '../component.service';

// Connections
import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';
let log = Logger.get('+connections/edit');

const STATE_KEY = 'connection-edit-state';

@Component({
  selector: 'connections-edit',
  styleUrls: [ 'edit.scss' ],
  templateUrl: 'edit.html',
  providers: [ ComponentService, ConnectionService ]
})
export class Edit implements OnInit, OnDestroy {

  limit = 60;
  trail = '..';

  currentStep = 1;
  listFilter: string;
  fieldListFilter: string;

  // Connections
  connections: IConnection[];
  connection: IConnection;
  //@Input() connection: IConnection;
  //@Output() connectionChanged = new EventEmitter<IConnection>();

  name: string;
  description: string;
  tags: string;
  defaults = {};

  // Components
  components: IComponent[];
  selectedComponent: IComponent;

  availableFields = [];
  enabledFields = [];
  showForm = false;
  showValidationMessage = false;

  private error: string;
  private sub: Subscription;


  /**
   * Constructor.
   * @param _componentService - ComponentService
   * @param _connectionService - ConnectionService
   * @param _route - ActivatedRoute
   * @param _router - Router
   * @param _state - AppState
   */
  constructor(private _componentService: ComponentService,
              private _connectionService: ConnectionService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _state: AppState) {
    this.error = '';
  }

  ngOnInit(): void {
    log.debug('hello `Connections: Edit` component');

    // Check if there are existing params. If so, do a lookup.
    /*
    if(this._route.params['_value'].id) {
      log.debug('this._route.params: ' + JSON.stringify(this._route.params['_value'].id));

      this.sub = this._route.params.subscribe(
        params => {
          let id = +params['id'];

          this._connectionService.get(id).subscribe(
            function(connection) {
              log.debug('Connection: ' + JSON.stringify(connection));
              log.debug('connection.name: ' + connection.name);
              // Map to Angular models as if new Connection
              log.debug('this.name: ' + this.name);
              log.debug('this.connection: ' + JSON.stringify(this.connection));
            },
            error => this.error = <any>error);
        });
    }
    */

    // Get all components
    this._componentService.getAll()
      .subscribe(components => this.components = components,
        error => this.error = <any>error);
  }

  ngOnDestroy() {}

  // View helpers
  fieldAvailable(field) {
    return !_.some(this.enabledFields, (e) => e.name === field.name);
  }

  getTags() {
    if(this.tags) {
      return _.map(this.tags.split(','), (tag) => tag.trim());
    } else {
      return;
    }
  }


  // State management
  persistState() {
    this._state.set(STATE_KEY, {
      name: this.name,
      description: this.description,
      tags: this.tags,
      defaults: this.defaults,
      showForm: this.showForm,
      selectedComponent: this.selectedComponent,
      availableFields: this.availableFields,
      enabledFields: this.enabledFields,
      currentStep: this.currentStep
    }, true);
  }

  clearState() {
    this._state.clear(STATE_KEY, true);
  }

  enableForm() {
    if (!this.enabledFields) {
      return false;
    }

    return this.showForm;
  }


  // Steps
  goToStep1() {
    this.currentStep = 1;
    //this.persistState();
  }

  goToStep2() {
    this.currentStep = 2;
    //this.persistState();
  }

  goToStep3() {
    this.currentStep = 3;
    //this.persistState();
  }

  toggleForm() {
    this.showForm = false;
    setTimeout(() => {
      this.showForm = true;
      //this.persistState();
    }, 5);
  }


  // Actions
  validateInputs() {
    setTimeout(() => {
      this.showValidationMessage = true;
    }, 1000);
  }

  // Field Actions

  addField(field) {
    this.enabledFields.push(field);
    this.toggleForm();
  }

  removeField(field) {
    _.remove(this.enabledFields, (f) => f.id == field.id);

    this.toggleForm();
  }


  // Move Fields

  move(from, to) {
    this.enabledFields.splice(to, 0, this.enabledFields.splice(from, 1)[ 0 ]);
  }

  moveUp(field) {
    let index = _.indexOf(this.enabledFields, field);

    this.move(index, index - 1);
    this.toggleForm();
  }

  moveDown(field) {
    let index = _.indexOf(this.enabledFields, field);

    this.move(index, index + 1);
    this.toggleForm();
  }


  // Select Component

  selectComponent(component) {
    this.selectedComponent = component;
    this.availableFields.length = 0;
    this.enabledFields.length = 0;
    this.defaults = {};

    const properties = JSON.parse(component.properties);

    _.forOwn(properties, (property, key) => {
      property.id = key;
      this.availableFields.push(property);
    });

    //this.persistState();
  }

  goBack(currentStep: number, $event: any): void {
    //log.debug('currentStep: ' + currentStep);

    currentStep = this.currentStep--;

    //log.debug('this.currentStep: ' + this.currentStep);
    //this.persistState();
  }

  cancelEdit(): void {
    //this.clearState();
    this._router.navigate([ '/connections' ]);
  }

  nextStep(currentStep: number, $event: any): void {
    //log.debug('currentStep: ' + currentStep);

    currentStep = this.currentStep++;

    //log.debug('this.currentStep: ' + this.currentStep);
    //this.persistState();
  }

  editConnection() {
    let connection: any = {
      name: this.name,
      description: this.description,
      icon: this.selectedComponent.icon,
      configuredProperties: JSON.stringify(this.enabledFields)
    };

    // TODO need a 'deploying' page state while this executes
    this._connectionService.update(connection).subscribe((resp) => {
      //this.clearState();
      log.debug('Response: ' + JSON.stringify(resp));

      // Add Toast notification here

      this._router.navigate([ '/connections' ]);
    }, (error) => {
      log.debug('Failed to edit connection: ', error);
    });
  }
}
