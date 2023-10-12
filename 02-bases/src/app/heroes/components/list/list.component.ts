import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public heroesNames: string[] = ['Spiderman','Hulk','Thor','SheHulk','IronMan']

  public deletedHeroe?: string;

  deleteHero():void {
    this.deletedHeroe = this.heroesNames.pop();
  }

}
