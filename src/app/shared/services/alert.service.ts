import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AlertService {

    constructor(private _snackBar: MatSnackBar) { }

    show(message: string) {
        this._snackBar.open(message, null, {
            duration: 2000
        });
    }
}
