import { Pipe, PipeTransform } from '@angular/core';

import { IComponent } from './component.model';

@Pipe({
  name: 'componentFilter'
})

export class ComponentFilter implements PipeTransform {
  transform(value: IComponent[], filterBy: string): IComponent[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((component: IComponent) =>
    component.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}



