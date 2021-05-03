import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {Hero} from '../data/hero';
import {HttpErrorResponse} from '@angular/common/http';

describe('HeroService', () => {
  let httpClientSpy: {get: jasmine.Spy };
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HeroService(httpClientSpy as any);
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it ('doit retourner les heroes attendus (HttpClient appelle 1x)', () => {
    const expectedHeroes: Hero[] = [
      // @ts-ignore
      {id: '1', name: 'A', attaque: 1, esquive: 1, degats: 1, pv: 1, points: 40, id_weapon: 'WWW', usage: 0, imageURL: 'ZZZZ'},
      // @ts-ignore
      {id: '2', name: 'B', attaque: 1, esquive: 1, degats: 1, pv: 1, points: 40, id_weapon: 'WWW', usage: 0, imageURL: 'ZZZZ'},
    ];

    httpClientSpy.get.and.returnValue(expectedHeroes);
  });

  it('return error if not found', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue((errorResponse));
    //
    // service.getHeroes().subscribe(
    //   heroes => fail('expected an error, not heroes'),
    //   error  => expect(error.message).toContain('test 404 error')
    // );
  });

});
