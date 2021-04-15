import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWeaponComponent } from './detail-weapon.component';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

describe('DetailWeaponComponent', () => {
  let component: DetailWeaponComponent;
  let fixture: ComponentFixture<DetailWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [ DetailWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
