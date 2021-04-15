import { TestBed } from '@angular/core/testing';

import { FirestoreImageService } from './firestore-image.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

describe('FirestoreImageService', () => {
  let service: FirestoreImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
    });
    service = TestBed.inject(FirestoreImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
