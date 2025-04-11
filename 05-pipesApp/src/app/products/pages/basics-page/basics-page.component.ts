import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.scss'
})
export class BasicsPageComponent {

  public nameLower: string = 'luca'
  public nameUpper: string = 'LUCA'
  public fullName: string = 'lUcA'

  public customDate: Date = new Date();

}
