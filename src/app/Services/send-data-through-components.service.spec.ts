import { TestBed } from '@angular/core/testing';

import { SendDataThroughComponentsService } from './send-data-through-components.service';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('SendDataThroughComponentsService', () => {
  let service: SendDataThroughComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(SendDataThroughComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
