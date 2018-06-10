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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {HeaderModule} from '../header/header.module';
import {MatTabsModule} from '@angular/material';
import { UserModule } from './user/user.module';
import {MemberModule} from '../member/member.module';
import {GroupModule} from '../group/group.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        HeaderModule,
        MatTabsModule,
        UserModule,
        MemberModule,
        GroupModule
    ],
    declarations: [AdminComponent]
})
export class AdminModule { }
