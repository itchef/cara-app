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
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import {LoginGuard} from './shared/guard/login.guard';
import {AdminGuard} from './shared/guard/admin.guard';

const routes: Routes = [
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [ AuthGuard, AdminGuard ] },
    { path: '', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canActivate: [ AuthGuard ] },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule', canActivate: [ LoginGuard ] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
