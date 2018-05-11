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

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {LoginRequest} from '../requests/login.request';
import {catchError, tap} from 'rxjs/operators';
import {AccessToken} from '../models/access-token';
import {LogoutRequest} from '../requests/logout.request';
import {HeadersUtils} from '../utils/headers.utils';

@Injectable()
export class SessionService {

    private URL = {
        token: 'http://localhost:3002/token',
        revoke: 'http://localhost:3002/revoke'
    };

    constructor(private _http: HttpClient) {}

    login(request: LoginRequest): Observable<boolean> {
        const headers = new HeadersUtils(localStorage.getItem('authToken')).default().getHeaders();
        return this._http.post<AccessToken>(this.URL.token, request, headers)
            .pipe(
                tap(response => {
                    const token = response as AccessToken;
                    if (token) {
                        localStorage.setItem('authToken', token.access_token);
                        localStorage.setItem('username', request.username);
                        return true;
                    }
                    return false;
                }),
                catchError(this.handleError<any>('Unable to perform login operation'))
            );
    }

    logout(request: LogoutRequest) {
        const headers = new HeadersUtils(localStorage.getItem('authToken')).default().getHeaders();
        return this._http.post(this.URL.revoke, request, headers)
            .pipe(
                tap(response => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                }),
                catchError(this.handleError<any>('Unable to perform logout operation'))
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
