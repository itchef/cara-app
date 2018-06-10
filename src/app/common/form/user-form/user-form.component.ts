/*
 * Cara APP is front end application for Cara application which gets supported by Cara API, which is a face cheat book for organisation
 *
 * Copyright (c) 2018 ITChef.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 * along with this program.  If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).
 *
 * @author Kaustav Chakraborty
 */

import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { CustomFormValidator } from '../../validator/custom-form.validator';
import { NewUserRequest } from '../../../shared/requests/new-user.request';
import {UserService} from '../../../shared/services/user.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
    selector: 'cara-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    providers: [
        UserService,
        AlertService
    ]
})
export class UserFormComponent implements OnInit {
    newUserForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<UserFormComponent>,
        private _userService: UserService,
        private _alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) private _matDialogData: any
    ) {
        this.newUserForm = this.getNewUserForm();
    }

    ngOnInit() {
    }

    addUser() {
        const userRequest = new NewUserRequest(
            this.newUserForm.controls['first_name'].value.trim(),
            this.newUserForm.controls['last_name'].value.trim(),
            this.newUserForm.controls['username'].value.trim(),
            this.newUserForm.controls['password'].value,
            this.newUserForm.controls['password_confirmation'].value
        );

        this._userService.addUser(userRequest).subscribe(user => {
                this._alertService.show(`${user.username} has been added`);
                this._matDialogRef.close(user);
            },
            error => this._alertService.show(error.message));
    }

    isPasswordMatched(): boolean {
        return this.newUserForm.controls['password'].value === this.newUserForm.controls['password_confirmation'].value;
    }

    isFormValid(): boolean {
        return !( this.newUserForm.valid && this.isPasswordMatched() );
    }

    isUsernameValid() {
        return this.newUserForm.get('username').valid;
    }

    private getNewUserForm() {
        return this._formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            username: ['',
                [Validators.required, CustomFormValidator.isUniqueUsername(this._matDialogData.usernames)]],
            password: ['', [Validators.required, CustomFormValidator.inputLengthValidation(10, 32)]],
            password_confirmation: ['', [
                Validators.required,
                CustomFormValidator.inputLengthValidation(10, 32)
            ]]
        });
    }
}
