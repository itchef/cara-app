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
import {MemberFormComponent} from '../../common/form/member-form/member-form.component';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {Member} from '../../shared/models/member';
import {MemberService} from '../../shared/services/member.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
    selector: 'cara-member-profile',
    templateUrl: './member-profile.component.html',
    styleUrls: ['./member-profile.component.scss'],
    providers: [
        MemberService,
        AlertService
    ]
})
export class MemberProfileComponent implements OnInit {
    member: Member;
    defaultImage: string;

    constructor(
        private _matDialogRef: MatDialogRef<MemberProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public _matDialogData: any,
        private _memberDialog: MatDialog,
        private _alertService: AlertService,
        private _memberService: MemberService
    ) {
        this.member = this._matDialogData.member;
        this.defaultImage = '../../../assets/images/cara-logo.png';
    }

    ngOnInit() {}

    closeMemberProfileModal(status: string = 'CLOSED') {
        this._matDialogRef.close(status);
    }

    deleteMember() {
        this._memberService.delete(this.member.id).subscribe(member => {
            this._alertService.show(`${member.name} is deleted successfully`);
            this.closeMemberProfileModal();
        },
            error => this._alertService.show(`${this.member.name}: ${error.message}`));
    }

    openEditMemberModal() {
        this._matDialogRef.close('EDIT');
        const _memberFormComponentDialogRef = this._memberDialog.open(MemberFormComponent, {
            width: '50%',
            data: {
                member: this.member
            }
        });
        _memberFormComponentDialogRef.afterClosed().subscribe(member => this.openTHIS(member || this.member));
    }

    private openTHIS(member) {

        this._memberDialog.open(MemberProfileComponent, {
            width: '35%',
            height: '85%',
            autoFocus: false,
            data: {
                member: member
            }
        });
    }
}
