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
import { UserComponent } from './user.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule
} from '@angular/material';
import {FormModule} from '../../common/form/form.module';
import { UserService } from '../../shared/services/user.service';
import {AlertService} from '../../shared/services/alert.service';
import {UserCardModule} from './user-card/user-card.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        FormModule,
        UserCardModule
    ],
    declarations: [UserComponent],
    providers: [
        UserService,
        AlertService
    ],
    exports: [UserComponent]
})
export class UserModule { }
