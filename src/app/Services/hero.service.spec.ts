import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [],
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
