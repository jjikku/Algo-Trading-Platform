import { TestBed } from '@angular/core/testing';

import { EditbookService } from './editbook.service';

describe('EditbookService', () => {
  let service: EditbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
