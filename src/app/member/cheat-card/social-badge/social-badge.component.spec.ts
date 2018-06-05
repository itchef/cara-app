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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBadgeComponent } from './social-badge.component';
import {MatIconModule} from '@angular/material';
import {Component, ViewChild} from '@angular/core';

xdescribe('SocialBadgeComponent', () => {
    let component: TestSocialBadgeComponent;
    let fixture: ComponentFixture<TestSocialBadgeComponent>;

    @Component({
        selector: 'cara-social-badge-test',
        template: `<cara-social-badge></cara-social-badge>`
    })
    class TestSocialBadgeComponent {
        @ViewChild(SocialBadgeComponent)
        public socialBadgeComponent: SocialBadgeComponent;
    }
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SocialBadgeComponent,
                TestSocialBadgeComponent
            ],
            providers: [ Window ],
            imports: [MatIconModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSocialBadgeComponent);
        component = fixture.componentInstance;
    });

    const setupComponentState = function (name: string, url: string) {
        const siteName = name;
        const link = url;
        component.socialBadgeComponent.siteName = siteName;
        component.socialBadgeComponent.link = link;
        fixture.detectChanges();
    };
    it('should show all social badge based on site name', function () {
        setupComponentState('Facebook', 'https://www.facebook.com/cara-test');
        const socialBadge = fixture.debugElement.nativeElement;
        expect(socialBadge.querySelectorAll('mat-icon[fontIcon="fa-facebook-f"]').length).toEqual(1);
    });

    it('should call navigateToSocial when social badge get clicked', function () {
        spyOn(window, 'open').and.returnValue('Called');
        setupComponentState('Facebook', 'https://www.facebook.com/cara-test');
        const socialBadge = fixture.debugElement.nativeElement;
        socialBadge.querySelector('.cara-badge').click();
        expect(window.open).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledTimes(1);
        expect(window.open).toHaveBeenCalledWith('https://www.facebook.com/cara-test', '_blank');
    });
});
