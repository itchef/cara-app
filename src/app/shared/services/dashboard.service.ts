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
import {DashboardGroup} from '../models/dashboard-group';
import {catchError, tap} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class DashboardService {
    private URL = {
        dashboard: 'http://localhost:3002/dashboard'
    };

    constructor(private _http: HttpClient) { }

    getGroups(): Observable<DashboardGroup[]> {
        return this._http.get(this.URL.dashboard)
            .pipe(
                tap(groups => groups),
                catchError(this.handleError<any>('Groups are unable to fetch'))
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
