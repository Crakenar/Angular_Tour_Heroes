import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeaponComponent } from './add-weapon.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';

describe('AddWeaponComponent', () => {
  let component: AddWeaponComponent;
  let fixture: ComponentFixture<AddWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [ AddWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
