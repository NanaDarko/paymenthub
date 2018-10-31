import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[IsEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: IsEqualValidator,
        multi: true
    }]
})
export class IsEqualValidator implements Validator {
    @Input() IsEqualValidator: string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        const controlToCompare = control.parent.get(this.IsEqualValidator);
        if (controlToCompare && controlToCompare.value !== control.value) {
            return { 'notEqual': true };
        }

        return null;
    }
}