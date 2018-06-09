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

import { TestBed} from '@angular/core/testing';

import { MemberService } from './member.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ModelGenerator} from '../../../spec-utils/model-generator';

describe('MemberService', () => {
    let http: HttpClient;
    let _modelGenerator: ModelGenerator;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                MemberService
            ]
        });
    });

    describe('get member list', () => {
        beforeEach(() => {
           http = TestBed.get(HttpClient);
           _modelGenerator = new ModelGenerator();
        });

        it('should get all members list successfully', function () {
            const response = new Observable(observer => {
                observer.next(_modelGenerator.generate('member', 3));
                observer.complete();
            });
            spyOn(http, 'get').and.returnValue(response);
            const memberService = new MemberService(http);
            memberService.getMemberList().subscribe(members => {
               expect(members.length).toBe(3);
            });
        });
        it('should throw error if http request is unsuccessful', function () {
            const unableToGetAllMembers = 'Unable to get all members';
            const response = new Observable(observer => {
                observer.error({
                    error: unableToGetAllMembers,
                    message: unableToGetAllMembers
                });
            });
            spyOn(http, 'get').and.returnValue(response);
            const memberService = new MemberService(http);
            spyOn(console, 'error');
            memberService.getMemberList().subscribe(members => {
                expect(members).toBeUndefined();
            }, error => {
                expect(console.error).toHaveBeenCalledWith({
                    error: unableToGetAllMembers,
                    message: unableToGetAllMembers
                });
                expect(error.message).toBe('Unable to get all members');
            });
        });
    });

    describe('save', () => {
        beforeEach(() => {
            http = TestBed.get(HttpClient);
            _modelGenerator = new ModelGenerator();
        });
        it('should save member successfully', function () {
            const member = _modelGenerator.generate('member', 1);
            const response = new Observable(observer => {
                observer.next(member);
                observer.complete();
            });
            spyOn(http, 'post').and.returnValue(response);
            const memberService = new MemberService(http);
            memberService.save(member).subscribe(responseMember => {
                expect(responseMember.name).toBe(member.name);
                expect(responseMember.age).toBe(member.age);
            });
        });
        it('should throw error on unsuccessful save', function () {
            const unableToSaveUserMessage = 'Unable to save user';
            const response = new Observable(observer => {
                observer.error({
                    error: unableToSaveUserMessage,
                    message: unableToSaveUserMessage
                });
            });
            spyOn(http, 'post').and.returnValue(response);
            const memberService = new MemberService(http);
            spyOn(console, 'error');
            memberService.getMemberList().subscribe(members => {
                expect(members).toBeUndefined();
            }, error => {
                expect(console.error).toHaveBeenCalledWith({
                    error: unableToSaveUserMessage,
                    message: unableToSaveUserMessage
                });
                expect(error.message).toBe('Unable to save user');
            });
        });
    });
    describe('get member', () => {
        beforeEach(() => {
            http = TestBed.get(HttpClient);
            _modelGenerator = new ModelGenerator();
        });
        it('should fetch member successfully', function () {
            const member = _modelGenerator.generate('member', 1);
            const response = new Observable(observer => {
                observer.next(member);
                observer.complete();
            });
            spyOn(http, 'get').and.returnValue(response);
            const memberService = new MemberService(http);
            memberService.getMember(1).subscribe(responseMember => {
                expect(responseMember.name).toBe(member.name);
                expect(responseMember.age).toBe(member.age);
            });
        });
        it('should throw error on unsuccessful fetch member', function () {
            const unableToSaveUserMessage = 'Unable to fetch member';
            const response = new Observable(observer => {
                observer.error({
                    error: unableToSaveUserMessage,
                    message: unableToSaveUserMessage
                });
            });
            spyOn(http, 'get').and.returnValue(response);
            const memberService = new MemberService(http);
            spyOn(console, 'error');
            memberService.getMemberList().subscribe(members => {
                expect(members).toBeUndefined();
            }, error => {
                expect(console.error).toHaveBeenCalledWith({
                    error: unableToSaveUserMessage,
                    message: unableToSaveUserMessage
                });
            });
        });
    });
});
