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
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {NewUserRequest} from '../requests/new-user.request';
import {UpdatePasswordRequest} from '../requests/update-password.request';
import {HttpUtils} from '../utils/http.utils';

@Injectable()
export class UserService {

    private URL = {
        users: 'http://localhost:3002/users'
    };
    private _httpUtils: HttpUtils;

    constructor(
        private _http: HttpClient
    ) {
        this._httpUtils = new HttpUtils();
    }

    getAll(): Observable<User[]> {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };

        return this._http.get<User[]>( this.URL.users, httpOptions )
            .pipe(
                tap(members => members),
                catchError(this.handleError<User[]>('Users are not fetched successfully'))
            );

    }

    addUser(request: NewUserRequest): Observable<User> {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };

        return this._http.post<User>(this.URL.users, request, httpOptions)
            .pipe(
                tap(user => user),
                catchError(this.handleError<any>('User is not created'))
            );
    }

    updatePassword(request: UpdatePasswordRequest, userId: number): Observable<User> {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };

        const url = `${this.URL.users}/${userId}/update_password`;
        return this._http.put<User>(url, request, httpOptions)
            .pipe(
                tap(user => user),
                catchError(this.handleError<any>('User is not created'))
            );
    }

    unsubscribe(userId: number): Observable<User> {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };
        const url = `${this.URL.users}/${userId}/unsubscribe`;
        return this._http.get<User>(url, httpOptions)
            .pipe(
                tap(user => user),
                catchError(this.handleError<any>('User is not unsubscribed'))
            );
    }

    subscribe(userId: number) {
        const httpOptions = {
            headers: new HttpHeaders(this._httpUtils.getHeader())
        };
        const url = `${this.URL.users}/${userId}/subscribe`;
        return this._http.get<User>(url, httpOptions)
            .pipe(
                tap(user => user),
                catchError(this.handleError<any>('User is not subscribed'))
            );
    }

    private handleError<T> (operation, result?: T) {
        return (operationError: any): Observable<T> => {
            console.error(operationError);
            console.log(`${operation} failed: ${operationError.message}`);
            throw new Error(operationError.error.message);
        };
    }
}
