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

import { TestBed, inject } from '@angular/core/testing';

import { ContactService } from './contact.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {ContactRequest} from '../requests/contact.request';
import {Contact} from '../models/contact';
import {Observable} from 'rxjs/Observable';

describe('ContactService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ContactService]
        });
    });

    it('should be created', inject([ContactService], (service: ContactService) => {
        expect(service).toBeTruthy();
    }));

    it('should add contacts successfully', function () {
        const http = TestBed.get(HttpClient);
        const contactRequests = [
            new ContactRequest('email', 'example@email.com'),
            new ContactRequest('phone', '1234567890')
        ];
        const contacts = [
            new Contact('email', 'example@email.com'),
            new Contact('phone', '1234567890')
        ];
        const response = new Observable(observer => {
            observer.next(contacts);
            observer.complete();
        });
        spyOn(http, 'post').and.returnValue(response);
        const contactService = new ContactService(http);
        contactService.addContacts(contactRequests, 1).subscribe(responseContacts => {
            expect(responseContacts.length).toBe(2);
            expect(http.post).toHaveBeenCalledTimes(1);
        });
    });

    it('should throw error on unsuccessful addition of contact', function () {
        const http = TestBed.get(HttpClient);
        const contactRequests = [
            new ContactRequest('email', 'example@email.com'),
            new ContactRequest('phone', '1234567890')
        ];
        const response = new Observable(observer => {
            const message = 'Unable to add contact';
            observer.error({
                message: message,
                error: message
            });
        });
        spyOn(http, 'post').and.returnValue(response);
        spyOn(console, 'error');
        const contactService = new ContactService(http);
        contactService.addContacts(contactRequests, 1).subscribe(results => {
                expect(results).toBeUndefined();
            }, error => {
                expect(console.error).toHaveBeenCalledWith(
                    {
                        message: 'Unable to add contact',
                        error: 'Unable to add contact'
                    }
                );
                expect(error.message).toBe('Unable to add contact');
            }
        );
    });
});
