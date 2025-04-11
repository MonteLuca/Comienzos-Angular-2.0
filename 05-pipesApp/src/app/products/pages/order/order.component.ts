import { Component } from '@angular/core';
import { EColor, IHero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  public isUpperCase: boolean = false;

  public orderBy?: keyof IHero;

  public heroes: IHero[] = [
    {
      name: 'Dr Strange',
      canFly: true,
      color: EColor.red
    },
    {
      name: 'Black Panther',
      canFly: false,
      color: EColor.black
    },
    {
      name: 'Hulk',
      canFly: false,
      color: EColor.green
    },
    {
      name: 'Captain America',
      canFly: false,
      color: EColor.blue
    },
    {
      name: 'Thor',
      canFly: true,
      color: EColor.yellow
    }
  ]

  toogleUpperCase(): void {
    this.isUpperCase = !this.isUpperCase;
  }

  changeOrder( value: keyof IHero ) {
    this.orderBy = value
  }

}
