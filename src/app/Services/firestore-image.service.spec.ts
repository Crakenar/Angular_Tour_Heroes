import { TestBed } from '@angular/core/testing';

import { FirestoreImageService } from './firestore-image.service';

describe('FirestoreImageService', () => {
  let service: FirestoreImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
