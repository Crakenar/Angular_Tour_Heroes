import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponComponent } from './weapon.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

describe('WeaponComponent', () => {
  let component: WeaponComponent;
  let fixture: ComponentFixture<WeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Ng2SearchPipeModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [ WeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
