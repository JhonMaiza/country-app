import { Component, inject, resource, signal } from '@angular/core'
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { SearchComponent } from "../../components/search/search.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';


@Component({
  selector: 'app-by-capital-page',
  imports: [SearchComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject( CountryService );
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if( !this.query() ) return of([]);
      
      return this.countryService.searchByCapital( request.query )
    },
  });
  
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({ request }) => {
  //     if( !this.query() ) return [];
      
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital( request.query )
  //     );
  //   },
  // });


  // isLoading = signal( false );
  // isError = signal< string | null >( null );
  // countries = signal< Country[] >([]);

  // onSearch( query: string ){
  //   this.isLoading.set( true );
  //   this.isError.set( null );
  //   this.countryService.searchByCapital( query ).subscribe({
  //     next: ( countries ) => {
  //       this.isLoading.set( false );
  //       this.countries.set( countries )
  //       console.log( countries );
  //     },
  //     error: ( err ) => {
  //       console.log(err);
  //       this.isLoading.set( false );
  //       this.countries.set( [] );
  //       this.isError.set(err);
  //     },
  //   });
  // }
}
