import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';
import { ButtonComponent } from "../../components/button/button.component";
import { ActivatedRoute, Router } from '@angular/router';

const validateQueryParam = ( queryparam: string ): Region => {
  const validRegions: Record<string, Region > = {
    'Africa': 'Africa',
    'Americas': 'Americas',
    'Asia': 'Asia',
    'Europe': 'Europe',
    'Oceania': 'Oceania',
    'Antarctic': 'Antarctic',
  };
  return validRegions[queryparam] ?? 'Americas'
}


@Component({
  selector: 'country-by-region',
  imports: [CountryListComponent, ButtonComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionComponent {
  countryService = inject(CountryService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router)
  queryParam = this.activeRoute.snapshot.queryParamMap.get('region') ?? '';

  query = linkedSignal<Region>( () => validateQueryParam(this.queryParam) );

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!this.query()) return of([]);
        this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.query
        }
      })
      return this.countryService.seachByRegion(request.query);
    },
  });

}
