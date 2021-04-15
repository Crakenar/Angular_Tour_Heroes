import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './crud-hero/heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { HeroDetailComponent } from './crud-hero/hero-detail/hero-detail.component';
import { WeaponComponent} from './crud-weapon/weapon/weapon.component';
import {DetailWeaponComponent} from './crud-weapon/detail-weapon/detail-weapon.component';
import {AddHeroComponent} from './crud-hero/add-hero/add-hero.component';
import {BattleComponent} from './first-game/battle/battle.component';
import {AddWeaponComponent} from './crud-weapon/add-weapon/add-weapon.component';
import {VictoryDefeatScreenComponent} from './first-game/victory-defeat-screen/victory-defeat-screen.component';
import {GamesSelectComponent} from './games-select/games-select.component';
import {MiniZeldaGameComponent} from './second-game/mini-zelda-game/mini-zelda-game.component';
import {InternalServerComponent} from './error-pages/internal-server/internal-server.component';
import {NotFound404Component} from './error-pages/not-found404/not-found404.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // LAZY LOAD MODULES
  { path: 'heroes', loadChildren: () => import('./crud-hero/crud-hero.module')
      .then(m => m.CrudHeroModule) },
  { path: 'weapons', loadChildren: () => import('./crud-weapon/crud-weapon.module')
      .then(m => m.CrudWeaponModule) },
  { path: 'battle/:id', loadChildren: () => import('./first-game/first-game.module')
      .then(m => m.FirstGameModule)},
  { path: 'zelda-game', loadChildren: () => import('./second-game/second-game.module')
      .then(m => m.SecondGameModule)},
  { path: 'error-pages', loadChildren: () => import ('./error-pages/error-pages.module')
      .then(m => m.ErrorPagesModule)},

  { path: 'dashboard', component: DashboardComponent },
  { path: 'game-select/:id', component: GamesSelectComponent },
  { path: '404', component: NotFound404Component },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
