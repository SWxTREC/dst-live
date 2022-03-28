import { TestBed } from '@angular/core/testing';

import { LatisService } from './latis.service';

describe('LatisService', () => {
    let service: LatisService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LatisService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
