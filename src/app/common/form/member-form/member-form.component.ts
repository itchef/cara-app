// Cara APP is front end application for Cara application which gets supported by Cara API, which is a face cheat book for organisation
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
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustormFormValidator} from '../../validator/custorm-form.validator';
import {MemberRequest} from '../../../shared/requests/member.request';
import {ContactRequest} from '../../../shared/requests/contact.request';
import {MatDialogRef} from '@angular/material';
import {MemberService} from '../../../shared/services/member.service';
import {ContactService} from '../../../shared/services/contact.service';

@Component({
    selector: 'cara-member-form',
    templateUrl: './member-form.component.html',
    styleUrls: ['./member-form.component.scss'],
    providers: [
        MemberService,
        ContactService
    ]
})
export class MemberFormComponent implements OnInit {
    memberFormGroup: FormGroup;
    memberPrimaryContactInfoFormGroup: FormGroup;
    memberSocialContactInfoFormGroup: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private _memberService: MemberService,
        private _contactService: ContactService,
        private _matDialogRef: MatDialogRef<MemberFormComponent>) { }

    ngOnInit() {
        this.memberFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            age: ['', [Validators.required, CustormFormValidator.ageValidation()]],
            place: ['', Validators.required],
            photo_url: ['']
        });
        this.memberPrimaryContactInfoFormGroup = this._formBuilder.group({
            phone: ['',  [Validators.required, CustormFormValidator.phoneValidation(10, 10)]],
            email: ['', [Validators.required, Validators.email]],
        });
        this.memberSocialContactInfoFormGroup = this._formBuilder.group({
            facebook: [''],
            twitter: [''],
            github: [''],
            linkedin: ['']
        });
    }

    getErrorMessage(control: AbstractControl) {
        return control.hasError('required') ? 'You must enter a value' :
            control.hasError('email') ? 'Not a valid email' :
                '';
    }

    saveForm(): void {
        const memberRequest = new MemberRequest(
            this.memberFormGroup.controls['name'].value,
            this.memberFormGroup.controls['age'].value,
            this.memberFormGroup.controls['place'].value,
            this.memberFormGroup.controls['photo_url'].value
        );
        this._memberService.save(memberRequest)
            .subscribe(member => {
                const contactRequests = Array<ContactRequest>();
                const contactControls = this.memberPrimaryContactInfoFormGroup.controls;
                const socialControls = this.memberSocialContactInfoFormGroup.controls;
                contactRequests.push(new ContactRequest('phone', contactControls['phone'].value));
                contactRequests.push(new ContactRequest('email', contactControls['email'].value));
                contactRequests.push(new ContactRequest('facebook', socialControls['facebook'].value));
                contactRequests.push(new ContactRequest('twitter', socialControls['twitter'].value));
                contactRequests.push(new ContactRequest('github', socialControls['github'].value));
                contactRequests.push(new ContactRequest('linkedin', socialControls['linkedin'].value));
                this._contactService.add_contacts(contactRequests, member.id).subscribe(
                    contacts => {
                        this._memberService.getMember(member.id)
                            .subscribe(memberObj => {
                                this._matDialogRef.close(memberObj);
                            });
                    }
                );
            },
                error => {
                    this._matDialogRef.close(error);
                });
    }
}
