import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MiniZeldaGameComponent } from './mini-zelda-game/mini-zelda-game.component';



@NgModule({
  declarations: [
    MiniZeldaGameComponent,
  ],
  exports: [
    MiniZeldaGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SecondGameModule { }
