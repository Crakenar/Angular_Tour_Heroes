import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ BattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
