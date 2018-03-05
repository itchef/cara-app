import { TestBed, inject } from '@angular/core/testing';

import { MemberService } from './member.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Member} from '../models/member';
import {HttpBackend, HttpRequest} from '@angular/common/http';

xdescribe('MemberService', () => {
    let memberService: MemberService;
    let backend: HttpBackend;

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

    it('should be created', () => {
        const members: Member[] = [
            new Member('John', 23, 'NY'),
            new Member('Smith', 40, 'Chicago')
        ];
    });
});
