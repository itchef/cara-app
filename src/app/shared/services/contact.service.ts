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
import {ContactRequest} from '../requests/contact.request';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../models/contact';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ContactService {
    private URL = {
        add_contacts: 'http://localhost:3002/contacts/add_contacts'
    };

    constructor(
        private _http: HttpClient,
    ) {}

    add_contacts (contactRequests: ContactRequest[], memberId: number): Observable<Contact[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        const requestData = {
            member_id: memberId,
            contacts: contactRequests
        };
        return this._http.post<Contact[]>(this.URL.add_contacts, requestData, httpOptions)
            .pipe(
                tap(contacts => console.log(`contacts ${contacts}`)),
                catchError(this.handleError<any>('Contacts are not saved'))
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