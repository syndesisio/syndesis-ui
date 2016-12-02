import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncate'})
export class Truncate implements PipeTransform {
  transform(value: string, limit: number, trail: string): string {
    limit = limit ? limit : 10;
    trail = trail && (trail.length) > 1 ? trail : '';

    if (value) {
      return value.substring(0, limit) + trail;
    } else {
      return value;
    }
  }
}

