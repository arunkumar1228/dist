import { TestBed } from '@angular/core/testing';

import { LetsTalkService } from './lets-talk.service';

describe('LetsTalkService', () => {
  let service: LetsTalkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetsTalkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
