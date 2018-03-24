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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupRequest} from '../../../shared/requests/group.request';
import {GroupService} from '../../../shared/services/group.service';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'cara-group-form',
    templateUrl: './group-form.component.html',
    styleUrls: ['./group-form.component.scss'],
    providers: [GroupService]
})
export class GroupFormComponent implements OnInit {

    newGroupForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _groupService: GroupService,
        private _matDialogRef: MatDialogRef<GroupFormComponent>
    ) {
        this.newGroupForm = this.getNewGroupForm();
    }

    ngOnInit() {
    }

    saveGroup() {
        const groupRequest = new GroupRequest(
            this.newGroupForm.controls['name'].value,
            this.newGroupForm.controls['description'].value
        );

        this._groupService.save(groupRequest)
            .subscribe(group => this._matDialogRef.close(group));

    }

    private getNewGroupForm(): FormGroup {
        return this._formBuilder.group({
            name: ['', Validators.required],
            description: ['']
        });
    }
}
