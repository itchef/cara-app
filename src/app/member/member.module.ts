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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { HeaderModule } from '../header/header.module';
import { CheatCardModule } from './cheat-card/cheat-card.module';
import { SharedModule } from '../shared/shared.module';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule
} from '@angular/material';
import { FormModule } from '../common/form/form.module';

@NgModule({
    imports: [
        CommonModule,
        MemberRoutingModule,
        HeaderModule,
        CheatCardModule,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        SharedModule,
        FormModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    declarations: [
        MemberComponent
    ]
})
export class MemberModule { }
