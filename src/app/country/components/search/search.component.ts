import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';
import { Idd } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  searchValue = output<string>();
  placeholder = input('Buscar');
  debounceTime = input(300)
  initialValue = input<string>();
  inputValue = linkedSignal<string>( () => this.initialValue() ?? '');

  debounceEffect = effect(( onCleanup ) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.searchValue.emit(value)
    }, this.debounceTime() );

    onCleanup(() => {
      clearTimeout( timeout );
    })
  })
}
