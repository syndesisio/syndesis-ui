import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'

import { AppState } from '../../app.service';

// Components
import { IComponent } from '../component.model';
import { ComponentService } from '../component.service';

// Connections
import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';
let log = Logger.get('+connections/create');

const STATE_KEY = 'connection-create-state';

@Component({
  selector: 'connections-create',
  styles: [ require('./create.scss') ],
  templateUrl: './create.html',
  providers: [ ComponentService, ConnectionService ]
})
export class Create implements OnInit, OnDestroy {
  limit = 60;
  trail = '..';

  currentStep = 1;
  listFilter: string;
  fieldListFilter: string;
  errorMessage: string;

  name: string;
  description: string;
  tags: string;
  defaults = {};

  connections: IConnection[];
  connection: IConnection;

  components: IComponent[];
  selectedComponent: IComponent;
  availableFields = [];
  enabledFields = [];
  showForm = false;
  showValidationMessage = false;

  /**
   * Constructor.
   * @param _componentService - ComponentService
   * @param _connectionService - ConnectionService
   * @param _router - Router
   * @param _state - AppState
   */
  constructor(private _componentService: ComponentService,
              private _connectionService: ConnectionService,
              private _router: Router,
              private _state: AppState) {
  }

  ngOnInit() {
    log.debug('hello `Connections: Create` component');

    /*
    this.clearState();

    const settings = this._state.get(STATE_KEY);

    if (settings) {
      this.name = settings.name;
      this.description = settings.description;
      this.tags = settings.tags;
      this.defaults = settings.defaults;
      this.showForm = settings.showForm;
      this.selectedComponent = settings.selectedComponent;
      this.availableFields = settings.availableFields || [];
      this.enabledFields = settings.enabledFields || [];
      this.currentStep = settings.currentStep || 1;
    }
    */

    this._componentService.getAll()
      .subscribe(components => this.components = components,
        error => this.errorMessage = <any>error);
  }

  ngOnDestroy() {
  }

  // Components
  getComponents() {
    this._componentService.getAll();
    //console.log('Components: ' + JSON.stringify(this.components));
  }

  // Connections
  getConnections() {
    this._connectionService.getAll();
    //console.log('Connections: ' + JSON.stringify(this.connection));
  }

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

  removeField(field) {
    _.remove(this.enabledFields, (f) => f.id == field.id);

    this.toggleForm();
  }

  addField(field) {
    this.enabledFields.push(field);
    this.toggleForm();
  }

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

  cancelCreate(): void {
    //this.clearState();
    this._router.navigate([ '/connections' ]);
  }

  nextStep(currentStep: number, $event: any): void {
    //log.debug('currentStep: ' + currentStep);

    currentStep = this.currentStep++;

    //log.debug('this.currentStep: ' + this.currentStep);
    //this.persistState();
  }

  createConnection() {
    let connection: any = {
      name: this.name,
      description: this.description,
      icon: this.selectedComponent.icon,
      configuredProperties: JSON.stringify(this.enabledFields)
    };
    
    // TODO need a 'deploying' page state while this executes
    this._connectionService.create(connection).subscribe((resp) => {
      //this.clearState();

      // Add Toast notification here

      this._router.navigate([ '/connections' ]);
    }, (error) => {
      console.log('Failed to create connection: ', error);
    });
  }

}
