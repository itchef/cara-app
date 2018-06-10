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
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomFormValidator} from '../../validator/custom-form.validator';
import {UpdatePasswordRequest} from '../../../shared/requests/update-password.request';
import {UserService} from '../../../shared/services/user.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
    selector: 'cara-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    providers: [
        UserService,
        AlertService
    ]
})
export class ChangePasswordComponent implements OnInit {
    public passwordUpdateForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _alertService: AlertService,
        private _matDialogRef: MatDialogRef<ChangePasswordComponent>,
        @Inject(MAT_DIALOG_DATA) private _matDialogData: any
    ) {
        this.passwordUpdateForm = this.getChangePasswordForm();
    }

    ngOnInit() {
    }

    isPasswordMatched(): boolean {
        return this.passwordUpdateForm.controls['password'].value === this.passwordUpdateForm.controls['password_confirmation'].value;
    }

    isFormValid(): boolean {
        return !( this.passwordUpdateForm.valid && this.isPasswordMatched() );
    }

    updatePassword() {
        const updatePasswordRequest = new UpdatePasswordRequest(
            this.passwordUpdateForm.controls['password'].value,
            this.passwordUpdateForm.controls['password_confirmation'].value
        );
        const userId = this._matDialogData.user.id;
        this._userService.updatePassword(updatePasswordRequest, userId)
            .subscribe(
                user => {
                    this._alertService.show(`${user.username} password has been updated`);
                    this._matDialogRef.close(user);
                },
                error => {
                    this._matDialogRef.close(error);
                }
            );
    }

    private getChangePasswordForm(): FormGroup {
        return this._formBuilder.group({
            password: ['', [
                Validators.required, CustomFormValidator.inputLengthValidation(10, 32)]
            ],
            password_confirmation: ['', [
                Validators.required,
                CustomFormValidator.inputLengthValidation(10, 32)
            ]]
        });
    }
}
