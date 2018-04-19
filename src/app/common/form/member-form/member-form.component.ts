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

import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustormFormValidator} from '../../validator/custorm-form.validator';
import {MemberRequest} from '../../../shared/requests/member.request';
import {ContactRequest} from '../../../shared/requests/contact.request';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MemberService} from '../../../shared/services/member.service';
import {ContactService} from '../../../shared/services/contact.service';
import {Contact} from '../../../shared/models/contact';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
    selector: 'cara-member-form',
    templateUrl: './member-form.component.html',
    styleUrls: ['./member-form.component.scss'],
    providers: [
        MemberService,
        ContactService,
        AlertService
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
        private _alertService: AlertService,
        private _matDialogRef: MatDialogRef<MemberFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _matDialogData: any
    ) { }

    ngOnInit() {
        this.memberFormGroup = this.getMemberFormGroup();
        this.memberPrimaryContactInfoFormGroup = this.getMemberPrimaryContactInfoFormGroup();
        this.memberSocialContactInfoFormGroup = this.getMemberSocialContactInfoFormGroup();
    }

    private getMemberSocialContactInfoFormGroup() {
        const socialContactData = {
            facebook: '',
            twitter: '',
            github: '',
            linkedin: ''
        };
        const member = this._matDialogData.member;
        if (member) {
            ['facebook', 'twitter', 'gitihub', 'linkedin'].forEach(type => {
                const contactInfo = this.getContactInfo(member.contacts, type);
                socialContactData[type] = contactInfo ? contactInfo.value : '';
            });
        }
        return this._formBuilder.group({
            facebook: [socialContactData.facebook],
            twitter: [socialContactData.twitter],
            github: [socialContactData.github],
            linkedin: [socialContactData.linkedin]
        });
    }

    private getMemberPrimaryContactInfoFormGroup() {
        const primaryContactData = {
            phone: '',
            email: ''
        };
        const member = this._matDialogData.member;
        if (member) {
            primaryContactData.phone = member.phone_numbers[0].value;
            primaryContactData.email = this.getContactInfo(member.contacts, 'email').value;
        }
        return this._formBuilder.group({
            phone: [primaryContactData.phone, [Validators.required, CustormFormValidator.phoneValidation(10, 10)]],
            email: [primaryContactData.email, [Validators.required, Validators.email]],
        });
    }

    getErrorMessage(control: AbstractControl) {
        return control.hasError('required') ? 'You must enter a value' :
            control.hasError('email') ? 'Not a valid email' :
                '';
    }

    saveForm(): void {
        const memberRequest = this.getMemberRequest();
        const contactRequests = this.getContactRequest();
        this._memberService.save(memberRequest)
            .subscribe(member => {
                    this._contactService.addContacts(contactRequests, member.id).subscribe(
                        contacts => {
                            this._memberService.getMember(member.id)
                                .subscribe(memberObj => {
                                    this._alertService.show(`${member.name} got created`);
                                    this._matDialogRef.close(memberObj);
                                });
                        }
                    );
                },
                error => {
                    this._matDialogRef.close(error);
                });
    }

    isUpdateMode() {
        return this._matDialogData.member !== undefined;
    }

    updateForm() {
        const memberRequest = this.getMemberRequest();
        const contactRequests = this.getContactRequest();
        const passedMemberData = this._matDialogData.member;
        this._memberService.update(memberRequest, passedMemberData.id)
            .subscribe(member => {
                this._contactService.addContacts(contactRequests, member.id).subscribe(
                    contacts => {
                        this._memberService.getMember(member.id)
                            .subscribe(memberObj => {
                                this._alertService.show(`${member.name}'s profile got updated.`);
                                this._matDialogRef.close(memberObj);
                            });
                    }
                );
            },
                error => {
                    this._matDialogRef.close(error);
                });
    }

    private getContactRequest() {
        const contactRequests = Array<ContactRequest>();
        const contactControls = this.memberPrimaryContactInfoFormGroup.controls;
        const socialControls = this.memberSocialContactInfoFormGroup.controls;
        contactRequests.push(new ContactRequest('phone', contactControls['phone'].value));
        contactRequests.push(new ContactRequest('email', contactControls['email'].value));
        contactRequests.push(new ContactRequest('facebook', socialControls['facebook'].value));
        contactRequests.push(new ContactRequest('twitter', socialControls['twitter'].value));
        contactRequests.push(new ContactRequest('github', socialControls['github'].value));
        contactRequests.push(new ContactRequest('linkedin', socialControls['linkedin'].value));
        return contactRequests;
    }

    private getMemberRequest() {
        return new MemberRequest(
            this.memberFormGroup.controls['name'].value,
            this.memberFormGroup.controls['age'].value,
            this.memberFormGroup.controls['place'].value,
            this.memberFormGroup.controls['photo_url'].value
        );
    }

    private getMemberFormGroup() {
        const memberData = {
            name: '',
            age: '',
            place: '',
            photo_url: ''
        };
        const member = this._matDialogData.member;
        if (member) {
            memberData.name = member.name;
            memberData.age = member.age;
            memberData.place = member.place;
            memberData.photo_url = member.photo_url;
        }
        return this._formBuilder.group({
            name: [memberData.name, Validators.required],
            age: [memberData.age, [Validators.required, CustormFormValidator.ageValidation()]],
            place: [memberData.place, Validators.required],
            photo_url: [memberData.photo_url]
        });
    }

    private getContactInfo(contacts: Contact[], type: string): Contact {
        return contacts.find(contact => contact.name === type);
    }
}
