import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseFirst'
})
export class UppercaseFirstPipe implements PipeTransform {

  transform(value: string): string {
     const stringSplit = value.split(' ');

     for (let i = 0; i < stringSplit.length; i++) {
       stringSplit[i] =
         stringSplit[i].charAt(0).toUpperCase() + stringSplit[i].slice(1);
     }
     const stringUpperCaseFirst = stringSplit.join(' ');
     return stringUpperCaseFirst;
  }

}
