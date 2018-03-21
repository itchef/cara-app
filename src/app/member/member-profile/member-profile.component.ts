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

import {Component, Inject, OnInit} from '@angular/core';
import {MemberFormComponent} from '../../common/form/member-form/member-form.component';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Member} from '../../shared/models/member';

@Component({
    selector: 'cara-member-profile',
    templateUrl: './member-profile.component.html',
    styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
    member: Member;
    defaultImage: string;

    constructor(
        private _matDialogRef: MatDialogRef<MemberFormComponent>,
        @Inject(MAT_DIALOG_DATA) public _matDialogData: any
    ) {
        this.member = this._matDialogData.member;
        this.defaultImage = '../../../assets/images/cara-logo.png';
    }

    ngOnInit() {}
}
