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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCardComponent } from './group-card.component';

xdescribe('GroupCardComponent', () => {
    let component: GroupCardComponent;
    let fixture: ComponentFixture<GroupCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GroupCardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
