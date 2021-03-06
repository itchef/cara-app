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

import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HeaderModule } from '../header/header.module';
import {MemberService} from './services/member.service';
import {ContactService} from './services/contact.service';
import {MatSnackBarModule} from '@angular/material';
import {AlertService} from './services/alert.service';
import {GroupService} from './services/group.service';

@NgModule({
    imports: [
        CommonModule,
        HeaderModule,
        HttpClientModule,
        MatSnackBarModule
    ],
    exports: [
        HeaderModule
    ],
    declarations: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                MemberService,
                ContactService,
                AlertService,
                GroupService
            ]
        };
    }
}
