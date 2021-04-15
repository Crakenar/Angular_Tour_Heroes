import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroComponent } from './add-hero.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FilterPipePipe} from '../../filter-pipe.pipe';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('AddHeroComponent', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase),
        ReactiveFormsModule,
      ],
      declarations: [
        AddHeroComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
