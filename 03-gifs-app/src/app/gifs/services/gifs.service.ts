import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  private GIPHY_KEY: string = 'NkdQ6fpAGYu9lgbCpDtVwELjaMdoL6cP';

  private SERVICE_URL: string = 'https://api.giphy.com/v1/gifs';

  private _tagsHistory: string[] = [];

  public gifList: Gif[] = []

  constructor( private http: HttpClient ) { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTagService( tag: string ) : void {
    if (tag.length === 0) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', this.GIPHY_KEY)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.SERVICE_URL}/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
      }
    )
  }

  private organizeHistory ( tag: string ) {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag )
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

}
