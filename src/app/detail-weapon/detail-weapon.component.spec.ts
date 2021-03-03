import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWeaponComponent } from './detail-weapon.component';

describe('DetailWeaponComponent', () => {
  let component: DetailWeaponComponent;
  let fixture: ComponentFixture<DetailWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
