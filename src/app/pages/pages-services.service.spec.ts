import { TestBed } from '@angular/core/testing';

import { PagesServicesService } from './pages-services.service';

describe('PagesServicesService', () => {
  let service: PagesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
