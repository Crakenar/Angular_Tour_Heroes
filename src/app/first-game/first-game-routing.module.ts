import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BattleComponent} from './battle/battle.component';
import {VictoryDefeatScreenComponent} from './victory-defeat-screen/victory-defeat-screen.component';



const routes: Routes = [
  { path: '', component:  BattleComponent},
  { path: 'victory-defeat-screen', component:  VictoryDefeatScreenComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstGameRoutingModule { }
