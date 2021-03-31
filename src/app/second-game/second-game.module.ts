import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MiniZeldaGameComponent} from './mini-zelda-game/mini-zelda-game.component';
import {RouterModule} from '@angular/router';



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
