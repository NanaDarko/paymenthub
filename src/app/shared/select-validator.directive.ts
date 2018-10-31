import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[selectOptionValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: SelectValidator,
        multi: true
    }]
})
export class SelectValidator implements Validator {
    // Create input property to receive the
    // specified default option value
    @Input('selectOptionValidator') defaultValue: string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        // Remove the hard-coded value and use the input property instead
        return control.value === this.defaultValue ?
                                    { 'defaultSelected': true } : null;
    }
}