import { AbstractControl, ValidatorFn } from '@angular/forms';

export function check(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value === true ? null : { notCheck: control.value };
}
