import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'

// Components
import { IComponent } from '../component.model';
import { ComponentService } from '../component.service';

// Connections
import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';
let log = Logger.get('+connections/create');

@Component({
  moduleId: module.id,
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
  errorMessage: string;

  //orderByArray: ['name', 'type'];

  //@Input() connections: IConnection[];
  connections: IConnection[];
  connection: IConnection;

  //@Input() components: IComponent[];
  components: IComponent[];
  selectedComponent: IComponent;
  availableFields = [];
  enabledFields = [];

  /**
   * Constructor.
   * @param _componentService - ComponentService
   * @param _connectionService - ConnectionService
   * @param _router - Router
   */
  constructor(private _componentService: ComponentService,
              private _connectionService: ConnectionService,
              private _router: Router) {}

  ngOnInit() {
    log.debug('hello `Connections: Create` component');

    /*
    this._connectionService.getAll()
      .subscribe(connections => this.connections = connections,
        error => this.errorMessage = <any>error);
        */

    this._componentService.getAll()
      .subscribe(components => this.components = components,
        error => this.errorMessage = <any>error);
  }

  ngOnDestroy() {}

  // Components
  getComponents() {
    this._componentService.getAll();

    console.log('Components: ' + JSON.stringify(this.components));
  }

  // Connections
  getConnections() {
    this._connectionService.getAll();

    console.log('Connections: ' + JSON.stringify(this.connection));
  }

  getFields() {
    if (!this.selectedComponent) {
      return [];
    }
    //return JSON.parse(this.selectedComponent.properties);
    return [];
  }


  // Steps
  goToStep1() {
    this.currentStep = 1;
  }

  goToStep2() {
    this.currentStep = 2;
  }

  goToStep3() {
    this.currentStep = 3;
  }


  // Actions
  addField(field) {
    this.enabledFields.push(field);
  }

  selectComponent(component) {
    this.selectedComponent = component;
    this.availableFields.length = 0;
    this.enabledFields.length = 0;
    const properties = JSON.parse(component.properties);
    _.forOwn(properties, (property, key) => {
      this.availableFields.push(property);
    });
  }

  goBack(currentStep: number, $event: any): void {
    console.log('currentStep: ' + currentStep);

    currentStep = this.currentStep--;

    console.log('this.currentStep: ' + this.currentStep);
  }

  cancelCreate(): void {
    this._router.navigate(['/connections']);
  }

  nextStep(currentStep: number, $event: any): void {
    console.log('currentStep: ' + currentStep);

    currentStep = this.currentStep++;

    console.log('this.currentStep: ' + this.currentStep);
  }

  submit(connection: IConnection, $event: any) {
    this.currentStep = 4;

    this._connectionService.create(this.connection);
  }

}
