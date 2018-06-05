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

import { TestBed, inject } from '@angular/core/testing';

import { GroupService } from './group.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Group} from '../models/group';
import {GroupRequest} from '../requests/group.request';
import {AssignGroupRequest} from '../requests/assign-group.request';
import {GroupAssignment} from '../models/group-assignment';
import {Member} from '../models/member';
import {MemberBasic} from '../models/member-basic';

describe('GroupService', () => {
    let http: HttpClient;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GroupService]
        });
        http = TestBed.get(HttpClient);
    });

    describe('group list', () => {
        it('should get list of groups', function () {
            const response = new Observable(observer => {
                const group = new Group();
                group.name = 'Group 1';
                const groups = [
                    group,
                    new Group(),
                    new Group(),
                    new Group()
                ];
                observer.next(groups);
                observer.complete();
            });
            spyOn(http, 'get').and.returnValue(response);
            const groupService = new GroupService(http);
            groupService.getGroupList().subscribe(groups => {
                expect(groups.length).toBe(4);
                expect(groups[0].name).toBe('Group 1');
            });
        });

        it('should get error message on error during fetching group list', function () {
            const unableToGetGroupListMessage = 'Unable to fetch group list';
            const response = new Observable(observer => {
                observer.error({
                    message: unableToGetGroupListMessage,
                    error: unableToGetGroupListMessage
                });
            });
            spyOn(http, 'get').and.returnValue(response);
            spyOn(console, 'error');
            const groupService = new GroupService(http);
            groupService.getGroupList().subscribe(groups => {
                expect(groups).toBeUndefined();
            }, error => {
                expect(console.error).toHaveBeenCalledWith(
                    {
                        message: unableToGetGroupListMessage,
                        error: unableToGetGroupListMessage
                    });
                expect(error.message).toBe('Unable to fetch group list');
            });
        });
    });

    describe('save', () => {
        const groupRequest = new GroupRequest('Group 1', 'About Group');
        it('should save a group successfully', function () {
            const response = new Observable(observer => {
                const group = new Group();
                group.name = groupRequest.name;
                group.description = groupRequest.description;
                observer.next(group);
                observer.complete();
            });
            spyOn(http, 'post').and.returnValue(response);
            const groupService = new GroupService(http);
            groupService.save(groupRequest)
                .subscribe(group => {
                    expect(group.name).toBe('Group 1');
                    expect(group.description).toBe('About Group');
                });
        });
        it('should throw error on unsuccessful group save', function () {
            const response = new Observable(observer => {
                const message = 'Unable to save group';
                observer.error({
                    message: message,
                    error: message
                });
            });
            spyOn(http, 'post').and.returnValue(response);
            const groupService = new GroupService(http);
            spyOn(console, 'error');
            groupService.save(groupRequest)
                .subscribe(group => {
                    expect(group).toBeUndefined();
                }, error => {
                    expect(console.error).toHaveBeenCalledWith({
                        message: 'Unable to save group',
                        error: 'Unable to save group'
                    });
                    expect(error.message).toBe('Unable to save group');
                });
        });
    });

    describe('assign member', () => {
        it('should assign a member to a group successfully', function () {
            const assignGroupRequest = new AssignGroupRequest(1, 2);
            const response = new Observable(observer => {
                const groupAssignment = new GroupAssignment();
                groupAssignment.group = new Group();
                groupAssignment.member = new Member('someName', 16, 'place');
                observer.next(groupAssignment);
                observer.complete();
            });
            spyOn(http, 'post').and.returnValue(response);
            const groupService = new GroupService(http);
            groupService.assignMember(assignGroupRequest).subscribe(groupAssignment => {
                expect(groupAssignment.member.name).toBe('someName');
                expect(groupAssignment.member.age).toBe(16);
            });
        });
        it('should throw error when assignment is unsuccessful', function () {
            const assignGroupRequest = new AssignGroupRequest(1, 2);
            const unableToAssignMemberMessage = 'Unable to assign member';
            const response = new Observable(observer => {
                observer.error({
                    error: unableToAssignMemberMessage,
                    message: unableToAssignMemberMessage
                });
            });
            spyOn(http, 'post').and.returnValue(response);
            const groupService = new GroupService(http);
            spyOn(console, 'error');
            groupService.assignMember(assignGroupRequest).subscribe(groupAssignment => {
                expect(groupAssignment).toBeUndefined();
            }, error => {
                expect(error.message).toBe('Unable to assign member');
                expect(console.error).toHaveBeenCalledWith(
                    {
                        error: 'Unable to assign member',
                        message: 'Unable to assign member'
                    });
            });
        });
    });
    describe('Unassigned Member', () => {
        it('should unassigned an already assigned member', function () {
            const assignGroupRequest = new AssignGroupRequest(1, 2);
            const response = new Observable(observer => {
                const memberBasic = new MemberBasic();
                memberBasic.id = 1;
                memberBasic.name = 'some name';
                memberBasic.photo_url = 'photo_path';
                observer.next(memberBasic);
                observer.complete();
            });
            spyOn(http, 'post').and.returnValue(response);
            const groupService = new GroupService(http);
            groupService.unassignedMember(assignGroupRequest).subscribe(member => {
                expect(member.name).toBe('some name');
                expect(member.photo_url).toBe('photo_path');
            });
        });
        it('should throw error when unassignment is unsuccessful', function () {
            const assignGroupRequest = new AssignGroupRequest(1, 2);
            const unableToAssignMemberMessage = 'Unable to unassign member';
            const response = new Observable(observer => {
                observer.error({
                    error: unableToAssignMemberMessage,
                    message: unableToAssignMemberMessage
                });
            });
            spyOn(http, 'post').and.returnValue(response);
            const groupService = new GroupService(http);
            spyOn(console, 'error');
            groupService.unassignedMember(assignGroupRequest).subscribe(groupAssignment => {
                expect(groupAssignment).toBeUndefined();
            }, error => {
                expect(error.message).toBe('Unable to unassign member');
                expect(console.error).toHaveBeenCalledWith(
                    {
                        error: 'Unable to unassign member',
                        message: 'Unable to unassign member'
                    });
            });
        });
    });
});
