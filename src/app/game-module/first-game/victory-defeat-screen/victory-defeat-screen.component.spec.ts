import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryDefeatScreenComponent } from './victory-defeat-screen.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';

describe('VictoryDefeatScreenComponent', () => {
  let component: VictoryDefeatScreenComponent;
  let fixture: ComponentFixture<VictoryDefeatScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ VictoryDefeatScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VictoryDefeatScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
