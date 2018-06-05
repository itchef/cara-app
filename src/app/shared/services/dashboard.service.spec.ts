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

import { DashboardService } from './dashboard.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DashboardGroup} from '../models/dashboard-group';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

describe('DashboardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DashboardService]
        });
    });

    it('should be created', inject([DashboardService], (service: DashboardService) => {
        expect(service).toBeTruthy();
    }));

    it('should fetch groups successfully', function () {
        const response = new Observable(observer => {
            const groups = [
                new DashboardGroup(),
                new DashboardGroup()
            ];
            observer.next(groups);
            observer.complete();
        });
        const http = TestBed.get(HttpClient);
        spyOn(http, 'get').and.returnValue(response);
        const dashboardService = new DashboardService(http);
        dashboardService.getGroups().subscribe(groups => {
            expect(groups.length).toBe(2);
        });
    });

    it('should throw error for unsuccessful fetch of dashboard groups', function () {
        const http = TestBed.get(HttpClient);
        const response = new Observable(observer => {
            observer.error('Unable to get dashboard');
        });
        spyOn(http, 'get').and.returnValue(response);
        const dashboardService = new DashboardService(http);
        spyOn(console, 'error');
        dashboardService.getGroups().subscribe(groups => {
            expect(groups).toBeUndefined();
        }, error => {
            expect(console.error).toHaveBeenCalledWith('Unable to get dashboard');
        });
    });
});
