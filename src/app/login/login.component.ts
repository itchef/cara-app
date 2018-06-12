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

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomFormValidator} from '../common/validator/custom-form.validator';
import {SessionService} from '../shared/services/session.service';
import {LoginRequest} from '../shared/requests/login.request';
import {AlertService} from '../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
    selector: 'cara-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        SessionService,
        AlertService,
        UserService
    ]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    private returnTo: string;

    constructor(
        private _formBuilder: FormBuilder,
        private _sessionService: SessionService,
        private _alertService: AlertService,
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.loginForm = this.getLoginForm();
    }

    ngOnInit() {
        this.returnTo = this._route.snapshot.queryParams['returnTo'] || '/';
    }

    login() {
        const loginRequest = new LoginRequest(
            this.loginForm.controls['username'].value,
            this.loginForm.controls['password'].value);
        this._sessionService.login(loginRequest)
            .subscribe(
                isTokenPresent => this.performLoginOnSuccess(isTokenPresent),
                error => this.showErrorMessage(error));
    }

    private performLoginOnSuccess(isTokenPresent: boolean) {
        if (!isTokenPresent) {
            this._alertService.show('Unable to login. Please try again later');
        } else {
            this._userService.getCurrentUser().subscribe(
                user => {
                    this._alertService.show('Welcome to Cara');
                    this._router.navigate([this.returnTo]);
                }
            );
        }
    }

    private showErrorMessage(response) {
        if (response.error === 'invalid_grant' || response.error === 'unauthorised') {
            const MESSAGE = 'Username / password is invalid';
            this._alertService.show(response.message || MESSAGE);
        }
    }

    private getLoginForm() {
        return this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, CustomFormValidator.inputLengthValidation(10, 32)]]
        });
    }
}
