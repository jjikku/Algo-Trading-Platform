import { TestBed } from '@angular/core/testing';

import { SinglebookService } from './singlebook.service';

describe('SinglebookService', () => {
  let service: SinglebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
