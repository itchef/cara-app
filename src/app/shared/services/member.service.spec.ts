import { TestBed, inject } from '@angular/core/testing';

import { MemberService } from './member.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpBackend, HttpRequest} from '@angular/common/http';

// TODO: Add test cases for Member service
xdescribe('MemberService', () => {
    // let memberService: MemberService;
    // let backend: HttpBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                MemberService,
                HttpBackend,
                HttpRequest
            ]
        });
    });
});
