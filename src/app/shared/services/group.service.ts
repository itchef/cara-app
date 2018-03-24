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
import {of} from 'rxjs/observable/of';
import {GroupRequest} from '../requests/group.request';
import {Member} from '../models/model';

@Injectable()
export class GroupService {

    private URL = {
        groups: 'http://localhost:3002/groups'
    };
    constructor(private _http: HttpClient) { }

    getGroupList(): Observable<Group[]> {
        return this._http.get( this.URL.groups )
            .pipe(
                tap(groups => groups),
                catchError(this.handleError<any>('Groups are not fetched successfully'))
            );
    }

    private handleError<T> (operation, result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    save(groupRequest: GroupRequest) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        return this._http.post<Member>(this.URL.groups, { group: groupRequest }, httpOptions)
            .pipe(
                tap(group => group),
                catchError(this.handleError<any>('group is not saved'))
            );
    }
}
