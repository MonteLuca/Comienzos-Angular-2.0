import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

  //Manera de hacerlo con FormGroup
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [],[]),
  //   price: new FormControl('', [],[]),
  //   inStorage: new FormControl('', [],[])
  // });

  //Manera de hacerlo con formBuilder
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]],
    inStorage: [0, [Validators.required, Validators.min(1)]]
  })

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    console.log(errors)
    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;
        case 'min':
          return `El valor debe ser mayor a 0`
        }
    }

    return null;
  }

  constructor( private fb: FormBuilder ) {}

  onSave(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return
    };

    this.myForm.reset({
      price: 0,
      inStorage: 0
    });

  }

}
