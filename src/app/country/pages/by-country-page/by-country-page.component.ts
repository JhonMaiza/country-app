import { Component, inject } from '@angular/core';
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

  onSearch( value: string ){
    console.log( value );
  }
}
