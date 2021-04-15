import { TestBed } from '@angular/core/testing';

import { WeaponsService } from './weapons.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

describe('WeaponsService', () => {
  let service: WeaponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
    });
    service = TestBed.inject(WeaponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
