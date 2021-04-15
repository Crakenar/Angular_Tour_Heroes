import { TestBed } from '@angular/core/testing';

import { BossService } from './boss.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

describe('BossService', () => {
  let service: BossService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
    });
    service = TestBed.inject(BossService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
