import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { IUser } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseURL = environments.baseUrl;
  private user?: IUser;

  constructor(private http: HttpClient) { }

  get currentUser(): IUser | undefined {
    if( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string): Observable<IUser> {

    // TODO http.post('login')

    return this.http.get<IUser>(`${ this.baseURL }/users/1`)
      .pipe(
        tap( user => { this.user = user; }),
        tap( user => localStorage.setItem( 'token', user.id.toString()))
      );
  }

  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<IUser>(`${this.baseURL}/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user ),
        catchError( err => of(false))
      )
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

}
