import { TestBed, inject } from '@angular/core/testing';

import { AlertService } from './alert.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';

describe('AlertService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule],
            providers: [AlertService]
        });
    });

    it('should be created', inject([AlertService], (service: AlertService) => {
        expect(service).toBeTruthy();
    }));

    it('should open snack bar once', function () {
        const snackBar = TestBed.get(MatSnackBar);
        spyOn(snackBar, 'open').and.returnValue(true);
        const alertService = new AlertService(snackBar);
        alertService.show('Some message');
        expect(snackBar.open).toHaveBeenCalledTimes(1);
    });
});
