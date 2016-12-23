import { Pipe, PipeTransform } from '@angular/core';

import { IIntegration } from './integration.model';

@Pipe({
  name: 'integrationFilter'
})

export class IntegrationFilter implements PipeTransform {
  transform(value: IIntegration[], filterBy: string): IIntegration[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((integration: IIntegration) =>
    integration.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}



