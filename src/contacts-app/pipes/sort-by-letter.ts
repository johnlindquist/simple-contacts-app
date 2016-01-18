import {Pipe} from 'angular2/core';
@Pipe({
  name: 'sortByLetter'
})
export class SortByLetter{
  transform(value){
    if(!value) return value;
    return value.sort(function(a:any, b:any){
      if(a.letter > b.letter) return 1;
      if(a.letter < b.letter) return -1;
      return 0;
    })
  }
}
