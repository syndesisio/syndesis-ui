import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Logger } from '../common/service/log';

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
		field.title = _.capitalize(field.title);
	}

}
