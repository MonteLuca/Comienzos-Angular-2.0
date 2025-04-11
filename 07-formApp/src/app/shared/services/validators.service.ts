import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  public userTaken = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        userIsTaken: true
      }
    }
    return null;
  }

  public isValidField(formGroup: FormGroup, field: string) {
    return formGroup.controls[field].errors
      && formGroup.controls[field].touched;
  }

  ifFieldOneEqualFieldTwo( field1: string, field2: string) {

    return (formGroup: FormGroup): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if( fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return {
          notEqual: true
        }
      }

      formGroup.get(field2)?.setErrors(null);

      return null;

    }

  }

}
