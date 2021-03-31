import { TestBed } from '@angular/core/testing';

import { SendDataThroughComponentsService } from './send-data-through-components.service';

describe('SendDataThroughComponentsService', () => {
  let service: SendDataThroughComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendDataThroughComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
