import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as _ from 'lodash';

import { Logger } from '../common/service/log';

let log = Logger.get('FormPropertyField');

@Component({
	selector: 'form-property-field',
	templateUrl: './formField.html'
})

/*
 * A field of a form
 */
export class FormPropertyField implements OnInit {

	@Input() form:FormGroup;
	@Input() field:any = {};
	@Input() entity:any = {};

	constructor() {

	}

	ngOnInit() {
		let field = this.field;
		if (!field.title) {
			field.title = field.id;
		}
	}

}
