import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldFilter'
})

export class FieldFilter implements PipeTransform {
  transform(value: any[], filterBy: string): any[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((field:any) =>
      field.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}



