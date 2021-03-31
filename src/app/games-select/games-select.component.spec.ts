import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSelectComponent } from './games-select.component';

describe('GamesSelectComponent', () => {
  let component: GamesSelectComponent;
  let fixture: ComponentFixture<GamesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
