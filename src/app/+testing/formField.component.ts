import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Logger } from '../common/service/log';

@Component({
	selector: 'form-property-field',
	templateUrl: './formField.html'
})

/*
 * A field of a form
 */
export class FormPropertyField {

	@Input() form:FormGroup;
	@Input() field:any = {};
	@Input() entity:any = {};

	constructor() {

	}

}
