import {PipeTransform, Pipe} from '@angular/core';
import {IConnectionService} from './connection.service.interface';

@Pipe({
    name: 'connectionFilter'
})
export class ConnectionFilterPipe implements PipeTransform {
    transform(value: IConnectionService[], filterBy: string): IConnectionService[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((connection: IConnectionService) =>
        connection.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
