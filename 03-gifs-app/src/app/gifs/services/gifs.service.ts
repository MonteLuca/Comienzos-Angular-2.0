import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private GIPHY_KEY: string = 'NkdQ6fpAGYu9lgbCpDtVwELjaMdoL6cP'

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTag( tag: string) : void {

    if ( tag.length === 0) return;

    this.organizeHistory( tag );

    fetch('')

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
