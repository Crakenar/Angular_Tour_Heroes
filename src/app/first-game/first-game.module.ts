import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle/battle.component';
import { CarreComponent } from './carre/carre.component';
import { VictoryDefeatScreenComponent } from './victory-defeat-screen/victory-defeat-screen.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    BattleComponent,
    CarreComponent,
    VictoryDefeatScreenComponent
  ],
  exports: [
    BattleComponent,
    CarreComponent,
    VictoryDefeatScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class FirstGameModule { }
