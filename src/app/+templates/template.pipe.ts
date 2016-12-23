import { Pipe, PipeTransform } from '@angular/core';

import { ITemplate } from './template.model';

@Pipe({
  name: 'templateFilter'
})

export class TemplateFilter implements PipeTransform {
  transform(value: ITemplate[], filterBy: string): ITemplate[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((template: ITemplate) =>
    template.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}



