import * as URI from 'urijs';
import * as _ from 'lodash';

import { Logger } from './../service/log';

var log = Logger.get('Forge');

export module ForgeHelpers {

	// common processing for all schemas received from Forge
	export function enrichSchema(schema:any) {
		if (!schema) {
			return schema;
		}
		var properties = _.get(schema, 'properties');
		if (!properties) {
			return schema;
		}
		_.forOwn(properties, (options, property) => {
			if (options.enum) {
				reworkEnum(options, property);
			}
		});
		return schema;
	}

	function reworkEnum(options, property) {
		options.type = 'enum';
		if (_.isArray(options.enum)) {
			var newEnum:any[] = _.map(options.enum, (value) => {
				if (_.isObject(value)) {
					return value;
				} else {
					return {
						value: value,
						key: value
					};
				}
			});
			options.enum = newEnum;
		} else if (_.isObject(options.enum)) {
			var newEnum:any[] = [];
			_.forOwn(options.enum, (value, key) => {
				newEnum.push({
					value: value,
					key: key
				});
			});
			options.enum = newEnum;
		}
	}

}

