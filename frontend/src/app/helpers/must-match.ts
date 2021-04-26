import { FormGroup } from '@angular/forms';

export function mustMatch(controlName: string, secondControlName: string) {
    return ( formGroup: FormGroup ) => {
        const control = formGroup.controls[controlName];
        const secondControl = formGroup.controls[secondControlName];

        if(secondControl.errors && !secondControl.errors.mustMatch) {
            //retornar si otro validador ya ha econtrado un error en el control correspondiente
            return;
        }
        //Establece el error en secondControl si falla la validación
        if(control.value !== secondControl.value) {
            secondControl.setErrors({'mustmatch': true})
        }
        else {
            secondControl.setErrors(null);
        }
    }
}