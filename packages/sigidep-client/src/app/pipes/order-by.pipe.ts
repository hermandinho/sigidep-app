import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], propertyName: string): any[] {
    if (propertyName)
      return value.sort((a: any, b: any) =>
        a[propertyName]?.toString().localeCompare(b[propertyName]?.toString())
      );
    else return value;
  }
}
