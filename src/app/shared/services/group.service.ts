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

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Group} from '../models/group';
import {catchError, tap} from 'rxjs/operators';
import {GroupRequest} from '../requests/group.request';
import {GroupAssignment} from '../models/group-assignment';
import {AssignGroupRequest} from '../requests/assign-group.request';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {MemberBasic} from '../models/member-basic';
import {HttpUtils} from '../utils/http.utils';

@Injectable()
export class GroupService {

    private URL = {
        groups: 'http://localhost:3002/groups',
        assignMember: 'http://localhost:3002/groups/assign_member',
        unassignedMember: 'unassigned_member'
    };
    private _httpUtils: HttpUtils;

    constructor(private _http: HttpClient) {
        this._httpUtils = new HttpUtils();
    }

    getGroupList(): Observable<Group[]> {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };
        return this._http.get( this.URL.groups, httpOptions )
            .pipe(
                tap(groups => groups),
                catchError(this.handleError<any>('Groups are not fetched successfully'))
            );
    }

    save(groupRequest: GroupRequest) {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };
        return this._http.post<Group>(this.URL.groups, { group: groupRequest }, httpOptions)
            .pipe(
                tap(group => group),
                catchError(this.handleError<any>('group is not saved'))
            );
    }

    assignMember(request: AssignGroupRequest) {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };
        return this._http.post<GroupAssignment>(this.URL.assignMember, request, httpOptions)
            .pipe(
                tap(groupAssignment => groupAssignment),
                catchError(this.handleError<any>('Member is not assigned to the group'))
            );
    }

    unassignedMember(request: AssignGroupRequest): Observable<MemberBasic> {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };
        const url = `${this.URL.groups}/${request.group_id}/${this.URL.unassignedMember}/${request.member_id}`;
        return this._http.delete<MemberBasic>(url, httpOptions)
            .pipe(
                tap(member => member),
                catchError(this.handleError<any>('Member is not assigned to the group'))
            );
    }

    private handleError<T> (operation, result?: T) {
        return (detailedError: any): Observable<T> => {
            console.error(detailedError);
            console.log(`${operation} failed: ${detailedError.message}`);
            return new ErrorObservable(detailedError.error);
        };
    }
}
