import { Component, inject, signal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchComponent } from "../../components/search/search.component";
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'country-by-country-page',
  imports: [CountryListComponent, SearchComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject( CountryService );
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if( !this.query() ) return of ([]);
      return this.countryService.searchByCountry( request.query )
    },
  });

  // onSearch( value: string ){
  // }
}
