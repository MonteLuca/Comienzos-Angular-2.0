import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { IHero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroById( id: string ): Observable<IHero | undefined> {
    return this.http.get<IHero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
  }

  getSuggestions( query: string): Observable<IHero[]> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  addHero( hero: IHero ): Observable<IHero> {
    return this.http.post<IHero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero( hero: IHero ): Observable<IHero> {
    if (!hero.id) throw Error ('Hero ID is required')
    return this.http.patch<IHero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById( id: string ): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map(resp => true),
      catchError( err => of(false)),
    );
  }

}
