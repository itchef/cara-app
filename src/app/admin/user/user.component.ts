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
import {MatDialog} from '@angular/material';
import {UserFormComponent} from '../../common/form/user-form/user-form.component';
import { User } from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {AlertService} from '../../shared/services/alert.service';
import {CollectionUtils} from '../../shared/utils/collection.utils';

@Component({
    selector: 'cara-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [
        UserService,
        AlertService
    ]
})
export class UserComponent implements OnInit {
    users: User[];

    constructor(
        private _dialog: MatDialog,
        private _userService: UserService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this._userService.getAll().subscribe(
            users => this.users = users,
            error => this._alertService.show(error.message)
        );
    }

    toggleUserForm() {
        const userFormDialogRef = this._dialog.open(UserFormComponent, {
            width: '50%',
            autoFocus: false,
            data: {
                usernames: CollectionUtils.getValues(this.users, 'username')
            }
        });

        userFormDialogRef.afterClosed().subscribe(user => {
            if (user) { this.users.push(user); }
        });
    }
}
