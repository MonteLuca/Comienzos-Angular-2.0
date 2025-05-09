import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class DbzService {

  public characters: Character[] = [{
    id: uuid(),
    name: 'Krillin',
    power: 1000
  },{
    id: uuid(),
    name: 'Goku',
    power: 9500
  },{
    id: uuid(),
    name: 'Vegeta',
    power: 7500
  }]

  addCharacterMain(character: Character): void {

    const newCharacter: Character = { id: uuid(), ...character} //AL PONER ...character le seteamos todos los atributos restantes

    this.characters.push(newCharacter);
  }

  // characterDelated(index: number) : void {
  //   this.characters.splice(index,1)
  // }

  deleteCharacterById( id: string) {
    this.characters = this.characters.filter ( character => character.id !== id )
  }

}
