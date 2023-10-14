import { TestBed } from '@angular/core/testing';

import { YtBrieferRequestService } from './yt-briefer-request.service';

describe('YtBrieferRequestService', () => {
  let service: YtBrieferRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtBrieferRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
