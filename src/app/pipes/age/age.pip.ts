import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Age' })
export class AgePipe implements PipeTransform {
  transform(value: Date | string): number {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }

    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - value.getTime();
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
  }
}
