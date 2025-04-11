import { I_Country } from './../interfaces/country.interface';
import { Injectable } from '@angular/core';
import { E_Region, I_SmallCountry } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl: string = 'https://restcountries.com/v3.1'

  private _regions: E_Region[] = [ E_Region.Africa, E_Region.Americas, E_Region.Asia, E_Region.Europe, E_Region.Oceania ]

  constructor(
    private http: HttpClient
  ) { }

  get regions(): E_Region[] {
    return [ ...this._regions ]
  }

  getCountriesByRegion( region: E_Region ): Observable<I_SmallCountry[]> {

    if( !region ) return of([]);

    const url: string = `${ this.baseUrl }/region/${ region}?fields=cca3,name,borders`

    return this.http.get<I_Country[]>(url)
      .pipe(
        map( countries => countries.map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        })))
      );
  }

  getCountryByAlphaCode( alphaCode: string ): Observable<I_SmallCountry> {

    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<I_Country>(url)
      .pipe(
        map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))
      )

  }

  getCountryBordersByCodes( borders: string[]): Observable<I_SmallCountry[]> {

    if(!borders || borders.length === 0 ) return of ([]);

    const countriesRequest: Observable<I_SmallCountry>[] = [];

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode( code );
      countriesRequest.push( request );
    })

    return combineLatest( countriesRequest )

  }

}
