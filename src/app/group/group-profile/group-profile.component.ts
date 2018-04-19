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
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Group} from '../../shared/models/group';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Member} from '../../shared/models/member';
import {map, startWith} from 'rxjs/operators';
import { MemberService } from '../../shared/services/member.service';
import {GroupService} from '../../shared/services/group.service';
import {AssignGroupRequest} from '../../shared/requests/assign-group.request';
import {AlertService} from '../../shared/services/alert.service';

@Component({
    selector: 'cara-group-profile',
    templateUrl: './group-profile.component.html',
    styleUrls: ['./group-profile.component.scss'],
    providers: [
        MemberService,
        GroupService,
        AlertService
    ]
})
export class GroupProfileComponent implements OnInit {
    group: Group;
    assignMemberControl = new FormControl();
    filteredMembers: Observable<Member[]>;
    private members: Member[];
    private _selectedMember: Member;

    constructor(
        private _groupProfileDialogRef: MatDialogRef<GroupProfileComponent>,
        @Inject(MAT_DIALOG_DATA) private _groupProfileDialogData: any,
        private _alertService: AlertService,
        private _memberService: MemberService,
        private _groupService: GroupService
    ) {
        this.group = this._groupProfileDialogData.group;
    }

    ngOnInit() {
        this._memberService.getMembersName()
            .subscribe(members => {
                this.members = members;
                this.filteredMembers = this.assignMemberControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(memberName => {
                            let name = memberName;
                            if (typeof memberName === 'number') {
                                this._selectedMember = this.getMember(this.members, memberName);
                                name = this._selectedMember.name;
                                this.assignMemberControl.setValue(name);
                            }
                            return name ? this.filterMemberName(name) : this.members.slice();
                        })
                    );
            });
    }

    addMemberToGroup() {
        if (!this._selectedMember) {
            this._alertService
                .show('Please select a valid member');
        }
        const assignGroupRequest = new AssignGroupRequest(this.group.id, this._selectedMember.id);
        this._groupService.assignMember(assignGroupRequest)
            .subscribe(memberAssignment => {
                    this._alertService
                        .show(`${memberAssignment.member.name} got successfully assigned to ${memberAssignment.group.name}`);
                    this.group.members.unshift(memberAssignment.member);
                    this.assignMemberControl.setValue('');
                },
                error => {
                    this._alertService
                        .show(`${this._selectedMember.name}: ${error.message}`);
                });
    }

    private filterMemberName(memberName: string) {
        return this.members.filter( member =>
            member.name.toLowerCase().indexOf(memberName.toLowerCase()) === 0);
    }

    private getMember(members: Member[], memberId: number) {
        return members.filter(member => member.id === memberId)[0];
    }

    isMemberPresent(): boolean {
        return this.group.members.length > 0;
    }
}
