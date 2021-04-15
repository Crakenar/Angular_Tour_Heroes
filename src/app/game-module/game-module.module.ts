import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GamesSelectComponent} from './games-select/games-select.component';
import {GameModuleRoutingModule} from './game-module-routing.module';



@NgModule({
  declarations: [
    GamesSelectComponent,
  ],
  imports: [
    CommonModule,
    GameModuleRoutingModule,
  ]
})
export class GameModuleModule { }
