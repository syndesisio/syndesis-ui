import {PipeTransform, Pipe} from '@angular/core';
import {IConnection} from './connection.service.interface';

@Pipe({
    name: 'connectionFilter'
})
export class ConnectionFilterPipe implements PipeTransform {
    transform(value: IConnection[], filterBy: string): IConnection[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((connection: IConnection) =>
        //connection.connectionName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
