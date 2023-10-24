import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html'
})

export class MainPageComponent {

  constructor(private dbzService: DbzService) {}

  get characters(): Character[] { //SI REALIZAMOS UN CAMBIO EN characters del get, HARIAMOS UN CAMBIO TAMBIEN EN EL SERVICE ASIQUE USAREMOS [...]
    return [...this.dbzService.characters];
  }

  onDeleteCharacter(id : string): void {
    this.dbzService.deleteCharacterById( id )
  }

  onNewCharacter( character : Character) {
    this.dbzService.addCharacterMain( character );
  }

}
