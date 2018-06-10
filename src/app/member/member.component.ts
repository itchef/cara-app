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

import {Component, OnDestroy, OnInit} from '@angular/core';
import { Member } from '../shared/models/model';
import {MemberService} from '../shared/services/member.service';
import {MatDialog} from '@angular/material';
import {MemberFormComponent} from '../common/form/member-form/member-form.component';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'cara-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
    providers: [
        MemberService
    ]
})
export class MemberComponent implements OnInit, OnDestroy {
    members: Member[];
    private _memberEventSubscription: Subscription;
    constructor(
        private _memberService: MemberService,
        public dialog: MatDialog
        ) { }

    ngOnInit() {
        this._memberService.getMemberList()
            .subscribe(members => this.members = members);
    }

    ngOnDestroy() {
        if (this._memberEventSubscription) {
            this._memberEventSubscription.unsubscribe();
        }
    }

    toggleAddMemberForm() {
        const dialogRef = this.dialog.open(MemberFormComponent, {
            width: '50%',
            data: {}
        });

        dialogRef.afterClosed().subscribe(member => {
            if (member) {
                this.members.push(member);
            }
        });
    }
}
