import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Regions } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiURL: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital:    { term: '', countries: []},
    byCountries:  { term: '', countries: []},
    byRegion:     { region: '', countries: []}
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  searchCountryByAlphaCode ( code: string ): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiURL}/alpha/${code}`)
    .pipe (
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError (error => {
        return of (error)
      })
    )
  }

  searchCapital ( capital : string ): Observable<Country[]>  {
    const url = `${this.apiURL}/capital/${capital}`;
    return this.getCountriesRequest(url)
        .pipe(
          tap( countries => this.cacheStore.byCapital = { term: capital , countries }),
          tap( () => this.saveToLocalStorage() )
        );
  }

  searchCountry ( country : string ): Observable<Country[]> {
    const url = `${this.apiURL}/name/${country}`;
    return this.getCountriesRequest(url)
        .pipe(
          tap( countries => this.cacheStore.byCountries = { term: country, countries}),
          tap( () => this.saveToLocalStorage() )
        );
  }

  searchRegion ( region : Regions ): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;
    return this.getCountriesRequest(url)
        .pipe(
          tap( countries => this.cacheStore.byRegion = { region , countries}),
          tap( () => this.saveToLocalStorage() )
        );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe (
      catchError (() => of ([]))
    );
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse ( localStorage.getItem('cacheStore')! );
  }

}
