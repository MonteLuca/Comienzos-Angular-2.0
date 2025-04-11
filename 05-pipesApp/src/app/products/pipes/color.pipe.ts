import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})

export class ColorPipe implements PipeTransform {
  transform(value: number): string {

    switch( value ) {
      case 0:
        return 'Rojo'
      case 1:
        return 'Negro'
      case 2:
        return 'Verde'
      case 3:
        return 'Azul'
      case 4:
        return 'Amarillo'
      default:
        return ''
    }

  }
}
