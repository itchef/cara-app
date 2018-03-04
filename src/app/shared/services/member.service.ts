// Cara API is Rest APIs for Cara application which is a face cheat book for organisation
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

@Injectable()
export class MemberService {
    private URL = {
        allMembers: 'http://localhost:3002/members'
    };

    constructor(
        private _http: HttpClient,
    ) {}

    getMemberList(): Observable<Member[]> {
        return this._http.get( this.URL.allMembers )
            .pipe(
                tap(members => console.log(`members ${members}`)),
                catchError(this.handleError<any>('updateHero'))
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