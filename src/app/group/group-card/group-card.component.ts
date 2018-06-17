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
import {Group} from '../../shared/models/group';
import {MatDialog} from '@angular/material';
import {GroupProfileComponent} from '../group-profile/group-profile.component';
import {GroupService} from '../../shared/services/group.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
    selector: 'cara-group-card',
    templateUrl: './group-card.component.html',
    styleUrls: ['./group-card.component.scss'],
    providers: [
        GroupService,
        AlertService
    ]
})
export class GroupCardComponent implements OnInit {
    @Input()
    group: Group;
    isDeleted = false;

    constructor(
        private _dialog: MatDialog,
        private _groupService: GroupService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
    }

    showGroupProfile() {
        this._dialog.open(GroupProfileComponent, {
            width: '35%',
            data: {
                group: this.group
            }
        });
    }

    removeGroup() {
        this._groupService.delete(this.group.id).subscribe(
            group => {
                this.isDeleted = true;
                this._alertService.show(`${group.name} is successfully deleted`);
            },
            error => { this._alertService.show(error.message); }
        );
    }
}
