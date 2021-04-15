import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSelectComponent } from './games-select.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('GamesSelectComponent', () => {
  let component: GamesSelectComponent;
  let fixture: ComponentFixture<GamesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ GamesSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSelectComponent);
    component = fixture.componentInstance;
    component.heroId = '2Nddd23f22';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
