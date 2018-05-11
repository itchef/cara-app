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
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Member } from '../models/model';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {MemberRequest} from '../requests/member.request';
import {HeadersUtils} from '../utils/headers.utils';

@Injectable()
export class MemberService {
    private URL = {
        members: 'http://localhost:3002/members'
    };

    constructor(
        private _http: HttpClient,
    ) {}

    getMemberList(): Observable<Member[]> {
        const headers = new HeadersUtils(localStorage.getItem('authToken')).default().getHeaders();
        return this._http.get( this.URL.members, headers)
            .pipe(
                tap(members => members),
                catchError(this.handleError<any>('Members are not fetched successfully'))
            );
    }

    getMembersName() {
        const headers = new HeadersUtils(localStorage.getItem('authToken')).default().getHeaders();
        const MEMBERS_NAME_URI = `${this.URL.members}/names`;
        return this._http.get( MEMBERS_NAME_URI, headers)
            .pipe(
                tap(members => members),
                catchError(this.handleError<any>('Members are not fetched successfully'))
            );
    }

    save(data: MemberRequest): Observable<Member> {
        const headers = new HeadersUtils(localStorage.getItem('authToken')).default().getHeaders();
        return this._http.post<Member>(this.URL.members, { personal: data }, headers)
            .pipe(
                tap(member => console.log(`member ${member}`)),
                catchError(this.handleError<any>('member is not saved'))
            );
    }

    getMember(memberId: number): Observable<Member> {
        const headers = new HeadersUtils(localStorage.getItem('authToken')).default().getHeaders();
        const url = `${this.URL.members}/${memberId}`;
        return this._http.get(url, headers).pipe(
            tap(member => member),
            catchError(this.handleError<any>('Member is not fetched successfully'))
        );
    }
    update(data: MemberRequest, memberId: number): Observable<Member> {
        const headers = new HeadersUtils(localStorage.getItem('authToken')).default().getHeaders();
        const uri = `${this.URL.members}/${memberId}`;
        return this._http.put<Member>(uri, { personal: data }, headers)
            .pipe(
                tap(member => member),
                catchError(this.handleError<any>('member is not saved'))
            );
    }

    delete(memberId: number) {
        const headers = new HeadersUtils(localStorage.getItem('authToken')).default().getHeaders();
        const uri = `${this.URL.members}/${memberId}`;
        return this._http.delete<Member>(uri, headers)
            .pipe(
                tap(member => member),
                catchError(this.handleError<any>('member is not deleted'))
            );
    }

    private handleError<T> (operation, result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
