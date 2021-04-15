import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MiniZeldaGameComponent} from './mini-zelda-game/mini-zelda-game.component';
import {VictoryDefeatScreenComponent} from '../first-game/victory-defeat-screen/victory-defeat-screen.component';



const routes: Routes = [
  { path: '', component:  MiniZeldaGameComponent },
  { path: 'victory-defeat-screen', component:  VictoryDefeatScreenComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondGameRoutingModule { }
