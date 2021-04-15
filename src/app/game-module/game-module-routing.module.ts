import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GamesSelectComponent} from './games-select/games-select.component';



const routes: Routes = [
  { path: '', component:  GamesSelectComponent },
  { path: 'battle', loadChildren: () => import('./first-game/first-game.module')
      .then(m => m.FirstGameModule) },
  { path: 'zelda-game', loadChildren: () => import('./second-game/second-game.module')
      .then(m => m.SecondGameModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameModuleRoutingModule { }
