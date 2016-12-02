import { Pipe, PipeTransform } from '@angular/core';

import { IConnection } from './connection.model';

@Pipe({
  name: 'connectionFilter'
})

export class ConnectionFilter implements PipeTransform {
  transform(value: IConnection[], filterBy: string): IConnection[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((connection: IConnection) =>
    connection.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}



