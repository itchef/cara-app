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
import { Member } from '../models/model';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {MemberRequest} from '../requests/member.request';

@Injectable()
export class MemberService {
    private URL = {
        members: 'http://localhost:3002/members'
    };

    constructor(
        private _http: HttpClient,
    ) {}

    getMemberList(): Observable<Member[]> {
        return this._http.get( this.URL.members )
            .pipe(
                tap(members => console.log(`members ${members}`)),
                catchError(this.handleError<any>('Members are not fetched successfully'))
            );
    }

    getMembersName() {
        const MEMBERS_NAME_URI = `${this.URL.members}/names`;
        return this._http.get( MEMBERS_NAME_URI )
            .pipe(
                tap(members => console.log(`members ${members}`)),
                catchError(this.handleError<any>('Members are not fetched successfully'))
            );
    }

    save(data: MemberRequest): Observable<Member> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        return this._http.post<Member>(this.URL.members, { personal: data }, httpOptions)
            .pipe(
                tap(member => console.log(`member ${member}`)),
                catchError(this.handleError<any>('member is not saved'))
            );
    }

    getMember(memberId: number): Observable<Member> {
        const url = `${this.URL.members}/${memberId}`;
        return this._http.get(url).pipe(
            tap(member => console.log(`member ${member}`)),
            catchError(this.handleError<any>('Member is not fetched successfully'))
        );
    }
    private handleError<T> (operation, result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    update(data: MemberRequest, memberId: number): Observable<Member> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        const uri = `${this.URL.members}/${memberId}`;
        return this._http.put<Member>(uri, { personal: data }, httpOptions)
            .pipe(
                tap(member => console.log(`member ${member}`)),
                catchError(this.handleError<any>('member is not saved'))
            );
    }
}
