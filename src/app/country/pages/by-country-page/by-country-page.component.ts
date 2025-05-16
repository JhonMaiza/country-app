import { Component, inject, linkedSignal, signal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchComponent } from "../../components/search/search.component";
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'country-by-country-page',
  imports: [CountryListComponent, SearchComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject( CountryService );
  activeRoute = inject(ActivatedRoute);
  router = inject(Router)
  queryParam = this.activeRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal( () => this.queryParam );

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if( !this.query() ) return of ([]);
            this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      })
      return this.countryService.searchByCountry( request.query )
    },
  });

  // onSearch( value: string ){
  // }
}
