import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniZeldaGameComponent } from './mini-zelda-game.component';

describe('MiniZeldaGameComponent', () => {
  let component: MiniZeldaGameComponent;
  let fixture: ComponentFixture<MiniZeldaGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
