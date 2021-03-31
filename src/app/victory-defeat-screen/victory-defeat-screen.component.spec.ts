import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryDefeatScreenComponent } from './victory-defeat-screen.component';

describe('VictoryDefeatScreenComponent', () => {
  let component: VictoryDefeatScreenComponent;
  let fixture: ComponentFixture<VictoryDefeatScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
