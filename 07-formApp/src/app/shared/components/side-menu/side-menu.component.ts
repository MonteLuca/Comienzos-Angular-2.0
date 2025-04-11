import { Component } from '@angular/core';
import { IMenuItem } from '../../interfaces/menuItem.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  public reactiveMenu: IMenuItem[] = [
    { title: 'Básicos', route: './reactive/basic'},
    { title: 'Dinámicos', route: './reactive/dynamic'},
    { title: 'Swithches', route: './reactive/switches'}
  ]

  public authMenu: IMenuItem[] = [
    { title: 'Registro', route: './auth'},
  ]

}
