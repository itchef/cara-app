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

import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthGuard]
        });
    });

    it('should not redirect to login page when auth token is preset', inject([AuthGuard], (guard: AuthGuard) => {
        localStorage.setItem('authToken', 'SomeToken');
        expect(guard.canActivate(null, null)).toBeTruthy();
        localStorage.removeItem('authToken');
    }));

    it('should redirect to login page when auth token is not present', function () {
        const mockRouter = TestBed.get(Router);
        spyOn(mockRouter, 'navigate').and.returnValue(null);
        localStorage.removeItem('authToken');
        const authGuard = new AuthGuard(mockRouter);
        const state = { url: 'someUrl' } as RouterStateSnapshot;
        expect(authGuard.canActivate(null, state)).toBeFalsy();
    });
});
