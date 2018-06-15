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

import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import { MatDialog } from '@angular/material';
import {ChangePasswordComponent} from '../../../common/modal/change-password/change-password.component';
import { UserService } from '../../../shared/services/user.service';
import {AlertService} from '../../../shared/services/alert.service';
import {AdminStatusRequest} from '../../../shared/requests/admin-status.request';

@Component({
    selector: 'cara-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    providers: [
        UserService,
        AlertService
    ]
})
export class UserCardComponent implements OnInit {
    @Input()
    user: User;

    isArchived = false;

    constructor(
        private _matDialog: MatDialog,
        private _userService: UserService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
    }

    showChangePasswordModal() {
        this._matDialog.open(ChangePasswordComponent, {
            width: '35%',
            data: {
                user: this.user
            }
        });
    }

    unsubscribe() {
        this._userService.unsubscribe(this.user.id)
            .subscribe(
                (userResponse) => {
                    this._alertService.show(`${userResponse.username} got unsubscribed successfully`);
                    this.user = userResponse;
                },
                (error) => {
                    this._alertService.show(error.message);
                }
            );
    }

    assignAdminStatus(adminStatus: boolean) {
        this._userService.assignAdminStatus(new AdminStatusRequest(adminStatus), this.user.id)
            .subscribe(userResponse => {
                    this._alertService.show(`${userResponse.username} is ${ userResponse.admin ? 'an admin' : 'non' +
                        ' admin' }`);
                    this.user = userResponse;
                },
                error => {
                    this._alertService.show(error.message);
                });
    }

    subscribe() {
        this._userService.subscribe(this.user.id)
            .subscribe(
                (userResponse) => {
                    this._alertService.show(`${userResponse.username} got subscribed successfully`);
                    this.user = userResponse;
                },
                (error) => {
                    this._alertService.show(error.message);
                }
            );
    }

    archive() {
        this._userService.archive(this.user.id)
            .subscribe(userResponse => {
                    this._alertService.show(`${userResponse.username} got archived successfully`);
                    this.isArchived = true;
                },
                error => {
                    this._alertService.show(error.message);
                }
            );
    }
}
