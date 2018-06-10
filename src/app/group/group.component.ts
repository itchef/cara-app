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
import {GroupFormComponent} from '../common/form/group-form/group-form.component';
import {Group} from '../shared/models/group';
import {GroupService} from '../shared/services/group.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
    selector: 'cara-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
    providers: [
        GroupService,
        AlertService
    ]
})
export class GroupComponent implements OnInit {

    groups: Group[];

    constructor(
        private _dialog: MatDialog,
        private _groupService: GroupService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this._groupService.getGroupList()
            .subscribe(groups => this.groups = groups);
    }

    toggleAddGroupForm() {
        const dialogRef = this._dialog.open(GroupFormComponent, {
            width: '50%',
            height: '40%',
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(group => {
            if (group) {
                this.groups.push(group);
                this._alertService.show(`Group: ${group.name} got created successfully`);
            }
        });
    }
}
