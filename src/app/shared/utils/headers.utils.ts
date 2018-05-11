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

import {HttpHeaders} from '@angular/common/http';

export class HeadersUtils {
    private _contentType: string;
    private _controlOrigins: string;
    private _token: string;


    constructor(token: string = '', contentType: string = '', controlOrigins: string = '') {
        this._contentType = contentType;
        this._controlOrigins = controlOrigins;
        this._token = token;
    }

    default(): HeadersUtils {
        return new HeadersUtils(this._token, 'application/json', '*');
    }

    getHeaders(): any {
        const httpHeaders = new HttpHeaders(this.json());
        return { headers: httpHeaders };
    }

    private json(): any {
        return {
            'Content-Type': this._contentType,
            'Access-Control-Allow-Origin': this._controlOrigins,
            'Authorization': `Bearer ${this._token}`
        };
    }
}
