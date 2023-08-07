import { TestBed } from '@angular/core/testing';

import { RequestTurnService } from './request-turn.service';

describe('RequestTurnService', () => {
  let service: RequestTurnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestTurnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
