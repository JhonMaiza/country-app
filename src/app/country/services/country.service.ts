import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({providedIn: 'root'})
export class CountryService {

    private http = inject( HttpClient );

    searchByCapital( query: string ): Observable<Country[]>{
        query = query.toLowerCase();

        return this.http
            .get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
            .pipe(
                map( (resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
                catchError( error => {
                    console.log('Error fetching', error);
                    return throwError(
                        () => new Error(`No se pudo obtener países con ese query: ${ query }`)
                    );
                    
                }),
            );
    };

    searchByCountry( query: string ): Observable<Country[]>{
        query = query.toLowerCase();
        const url = `${ API_URL }/name/${ query }`;
        return this.http.get<RESTCountry[]>( url ).pipe(
            map( ( resp ) => CountryMapper.mapRestCountryArrayToCountryArray( resp ) ),
            delay(1000),
            catchError( (err) => {
                console.log('Error fetching', err);
                return throwError(
                    () => new Error(`No se pudo obtener paíse con ese query: ${ query }`)
                )
            }),
        );
    };

    searchCountryByAlphaCode( code: string ){
        const url = `${ API_URL }/alpha/${ code }`;
        return this.http.get<RESTCountry[]>(url).pipe(
            map(( resp ) => CountryMapper.mapRestCountryArrayToCountryArray( resp )),
            map(( countries ) => countries.at( 0 )),
            delay(1000),
            catchError( (err) => {
                console.log('Error fetching', err);
                return throwError(
                    () => new Error(`No se pudo obtener paíse con ese código: ${ code }`)
                )
            }),
        );
    };
}