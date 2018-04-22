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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardGroup} from '../shared/models/dashboard-group';
import {AlertService} from '../shared/services/alert.service';
import {DashboardService} from '../shared/services/dashboard.service';

@Component({
    selector: 'cara-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    groups: DashboardGroup[];

    constructor(
        private _dashboardService: DashboardService,
        private _alertService: AlertService
    ) {}

    ngOnInit() {
        this._dashboardService.getGroups().subscribe(
            groups => this.groups = groups,
            error => this._alertService.show(error.message)
        );
    }

    ngOnDestroy(): void {
    }

    isMemberPresent(group: DashboardGroup): boolean {
        return group.members.length > 0;
    }
}
