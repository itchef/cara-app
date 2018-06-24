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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {LoginRequest} from '../requests/login.request';
import {catchError, tap} from 'rxjs/operators';
import {AccessToken} from '../models/access-token';
import {LogoutRequest} from '../requests/logout.request';
import * as config from '../../../config/config.json';

@Injectable()
export class SessionService {
    private _apiURL = (<any>config).apiURL;
    private URL = {
        token: `${this._apiURL}/access-token`,
        revoke: `${this._apiURL}/revoke`
    };

    constructor(private _http: HttpClient) { }

    login(request: LoginRequest): Observable<boolean> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        console.log(this._apiURL);
        return this._http.post<AccessToken>(this.URL.token, request, httpOptions)
            .pipe(
                tap(token => {
                    if (token) {
                        localStorage.setItem('authToken', token.access_token);
                        return true;
                    }
                    return false;
                }),
                catchError(this.handleError<any>('Unable to perform login operation'))
            );
    }

    logout(request: LogoutRequest) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        return this._http.post(this.URL.revoke, request, httpOptions)
            .pipe(
                tap(response => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('admin');
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
