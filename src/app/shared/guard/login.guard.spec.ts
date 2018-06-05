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

import { LoginGuard } from './login.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

describe('LoginGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [LoginGuard]
        });
    });

    it('should be truthy when auth token is not available', inject([LoginGuard], (guard: LoginGuard) => {
        expect(guard.canActivate(null, null)).toBeTruthy();
    }));

    it('should redirect to the state url when auth token is present', () => {
        const mockRouter = TestBed.get(Router);
        spyOn(mockRouter, 'navigate').and.returnValue(null);
        const loginGuard = new LoginGuard(mockRouter);
        localStorage.setItem('authToken', 'SomeToken');
        const state = { url: 'someUrl' } as RouterStateSnapshot;
        expect(loginGuard.canActivate(null, state)).toBeFalsy();
        localStorage.removeItem('authToken');
    });
});
