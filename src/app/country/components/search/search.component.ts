import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  searchValue = output<string>();
  placeholder = input('Buscar');
}
