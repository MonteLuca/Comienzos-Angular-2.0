import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input('characterListComponent')
  public characterList: Character[] = [];

  @Output()
  public deletedCharacter : EventEmitter<string> = new EventEmitter();

  onDeleteCharacter( id? : string) : void {

    if ( !id ) return;

    this.deletedCharacter.emit( id )

  }

}
