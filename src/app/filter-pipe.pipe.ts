import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByInputHeroes'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input){
      return value.filter((val: any[]) => val.indexOf(input) >= 0);
    }else {
      return value;
    }
  }
}
