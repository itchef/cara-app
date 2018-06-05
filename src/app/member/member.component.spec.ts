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

import { async, TestBed } from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MemberComponent } from './member.component';
import {MemberService} from '../shared/services/member.service';
import {HttpClient} from '@angular/common/http';
import {Member} from '../shared/models/member';
import {HeaderModule} from '../header/header.module';
import {CheatCardModule} from './cheat-card/cheat-card.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatDialog, MatIconModule} from '@angular/material';
import Spy = jasmine.Spy;

xdescribe('MemberComponent', () => {
    let component: MemberComponent;
    let memberService: MemberService;
    let dialog: MatDialog;
    let spy: Spy;
    let members: Member[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HeaderModule,
                CheatCardModule,
                HttpClientTestingModule,
                MatIconModule
            ],
            declarations: [ MemberComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        memberService = new MemberService(TestBed.get(HttpClient));
        dialog = TestBed.get(MatDialog);
        component = new MemberComponent(memberService, dialog);
        members = [
            new Member('Aksar', 29, 'Bengaluru'),
            new Member('Sam', 23, 'Hyderabad')
        ];
        spy = spyOn(memberService, 'getMemberList').and.returnValue(Observable.of(members));
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initiate members list', () => {
        expect(component.members).toEqual(members);
        expect(spy.calls.count()).toEqual(1);
    });

    it('should toggle add member form', function () {
        const dialogRef = {
            afterClosed: () => {
                return {
                    subscribe: (action) => {
                        action();
                    }
                };
            }
        };
        spy = spyOn(dialog, 'open').and.returnValue(dialogRef);
        component.ngOnInit();
    });
});
