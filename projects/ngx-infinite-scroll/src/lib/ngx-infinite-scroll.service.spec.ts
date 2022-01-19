import { TestBed } from '@angular/core/testing';

import { NgxInfiniteScrollService } from './ngx-infinite-scroll.service';

describe('NgxInfiniteScrollService', () => {
  let service: NgxInfiniteScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxInfiniteScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
