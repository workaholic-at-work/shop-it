import { Directive, Input } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
	selector: '[appMinlengthValidatorDirective]',
	providers: [{ provide: NG_VALIDATORS, useExisting: MinlengthValidatorDirective, multi: true }]
})
export class MinlengthValidatorDirective implements Validator {
	@Input('appMinlengthValidatorDirective') lenghtValidator: { minlength: number, maxlength: number };

	validate(control: FormControl): { [s: string]: boolean } {
		if (control.value && (control.value.length < this.lenghtValidator.minlength
			|| control.value.length > this.lenghtValidator.maxlength)) {
			return { minLength: true };
		}
		return null;
	}
}
