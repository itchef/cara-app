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

import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberFormComponent } from './member-form/member-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule, MatSlideToggleModule,
    MatStepperModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import { GroupFormComponent } from './group-form/group-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SessionService } from '../../shared/services/session.service';

@NgModule({
    imports: [
        CommonModule,
        MatStepperModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatSlideToggleModule
    ],
    declarations: [
        MemberFormComponent,
        GroupFormComponent,
        UserFormComponent
    ],
    entryComponents: [
        MemberFormComponent,
        GroupFormComponent,
        UserFormComponent
    ],
    exports: [
        MemberFormComponent,
        GroupFormComponent,
        UserFormComponent
    ],
    providers: [
        SessionService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FormModule { }
