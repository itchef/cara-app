// Cara APP is front end application for Cara application which gets supported by Cara API, which is a face cheat book for organisation
// Copyright (C) 2018  ITChef
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).
//
// @author Kaustav Chakraborty

import {AbstractControl, ValidatorFn} from '@angular/forms';

export class CustormFormValidator {
    static phoneValidation(min: number, max: number): ValidatorFn {
        return (input: AbstractControl): { [key: string]: boolean } | null => {
            const lengthOfInput = (input.value) ? input.value.toString().length : 0;
            if (lengthOfInput < min || lengthOfInput > max) {
                return { 'range': true };
            }
            return null;
        };
    }

    static ageValidation(): ValidatorFn {
        return (input: AbstractControl): { [key: string]: boolean } | null => {
            if (isNaN(input.value)) {
                return { 'notANumber': true };
            }
            return null;
        };
    }
}
