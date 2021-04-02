import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MiniZeldaGameComponent } from './mini-zelda-game/mini-zelda-game.component';
import { BoardComponent } from './board/board.component';
import {SecondGameRoutingModule} from './second-game-routing.module';



@NgModule({
  declarations: [
    MiniZeldaGameComponent,
    BoardComponent,
  ],
  exports: [
    MiniZeldaGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SecondGameRoutingModule
  ]
})
export class SecondGameModule { }
