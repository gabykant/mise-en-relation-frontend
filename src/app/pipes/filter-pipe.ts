import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(item: any[], searchText: string): any[] {
    if(!item) {
      return [];
    }
    if (!searchText || searchText.length === 0) {
      return item;
    }
    searchText = searchText.toLowerCase();

    return item.filter((i) => {
      if (typeof i === 'string') {
        return i.toLowerCase().includes(searchText);
      } else if (typeof i === 'object' && i !== null) {
        return Object.values(i).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchText)
        );
      }
      return false;
    }
    );
  }
}
