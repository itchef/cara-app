// Cara APP is front end application for Cara application which gets supported by Cara API, which is a face cheat book for organisation.
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

import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared/services/session.service';
import { AlertService } from '../shared/services/alert.service';
import {LogoutRequest} from '../shared/requests/logout.request';
import {Router} from '@angular/router';

@Component({
    selector: 'cara-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [
        SessionService,
        AlertService
    ]
})
export class HeaderComponent implements OnInit {
    loggedInUser: string;

    constructor(
        private _sessionService: SessionService,
        private _alertService: AlertService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.loggedInUser = localStorage.getItem('username');
    }

    logout() {
        const logoutRequest = new LogoutRequest(localStorage.getItem('authToken'));
        this._sessionService.logout(logoutRequest)
            .subscribe(
                () => {
                    this._alertService.show('Thank you for using Cara. See you soon');
                    this._router.navigate(['/login']);
                },
                error => this._alertService.show(error.message)
            );
    }
}
