// Cara API is Rest APIs for Cara application which is a face cheat book for organisation
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatCardComponent } from './cheat-card.component';
import { Member } from '../../shared/models/member';
import {MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {Component, Input, ViewChild} from '@angular/core';

describe('CheatCardComponent', () => {
    let component: TestCheatCardComponent;
    let fixture: ComponentFixture<TestCheatCardComponent>;

    @Component({
        selector: 'cara-cheat-card-test',
        template: `<cara-cheat-card></cara-cheat-card>`
    })
    class TestCheatCardComponent {
        @ViewChild(CheatCardComponent)
        public cheatCardComponent: CheatCardComponent;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatIconModule
            ],
            declarations: [
                CheatCardComponent,
                TestCheatCardComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCheatCardComponent);
        component = fixture.componentInstance;
    });

    it('should show card for a member', function (done: DoneFn) {
        const member: Member = new Member('Alan', 23, 'London');
        component.cheatCardComponent.member = member;
        fixture.detectChanges();
        const memberCard = fixture.debugElement.nativeElement;
        expect(memberCard.querySelector('mat-card-title').textContent).toContain('Alan');
        expect(memberCard.querySelector('mat-card-subtitle').textContent).toContain('23 Years');
        expect(memberCard.querySelector('span').querySelector('span').textContent)
            .toContain('London');
        done();
    });
});
