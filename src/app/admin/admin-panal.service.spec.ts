import { TestBed } from '@angular/core/testing';

import { AdminPanalService } from './admin-panal.service';

describe('AdminPanalService', () => {
  let service: AdminPanalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPanalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
