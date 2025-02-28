import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniZeldaGameComponent } from './mini-zelda-game.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';

describe('MiniZeldaGameComponent', () => {
  let component: MiniZeldaGameComponent;
  let fixture: ComponentFixture<MiniZeldaGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ MiniZeldaGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniZeldaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
