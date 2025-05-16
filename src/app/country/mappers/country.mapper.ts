import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {
    static mapRestCountryToContry( restCountry: RESTCountry ): Country{
        return {
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagsSvg: restCountry.flags.svg,
            name: restCountry.translations["spa"].common ?? 'No spanish Name',
            capital: restCountry.capital?.join(','),
            population: restCountry.population,
            region: restCountry.region,
            subRegion: restCountry.subregion,
        }
    };

    static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[]): Country[]{
        return restCountries.map( this.mapRestCountryToContry );
    };
}