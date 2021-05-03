import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './editor-module/crud-hero/heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { HeroDetailComponent } from './editor-module/crud-hero/hero-detail/hero-detail.component';
import { WeaponComponent} from './editor-module/crud-weapon/weapon/weapon.component';
import {DetailWeaponComponent} from './editor-module/crud-weapon/detail-weapon/detail-weapon.component';
import {AddHeroComponent} from './editor-module/crud-hero/add-hero/add-hero.component';
import {BattleComponent} from './game-module/first-game/battle/battle.component';
import {AddWeaponComponent} from './editor-module/crud-weapon/add-weapon/add-weapon.component';
import {VictoryDefeatScreenComponent} from './game-module/first-game/victory-defeat-screen/victory-defeat-screen.component';
import {GamesSelectComponent} from './game-module/games-select/games-select.component';
import {MiniZeldaGameComponent} from './game-module/second-game/mini-zelda-game/mini-zelda-game.component';
import {InternalServerComponent} from './error-pages/internal-server/internal-server.component';
import {NotFound404Component} from './error-pages/not-found404/not-found404.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // LAZY LOAD MODULES
  { path: 'heroes', loadChildren: () => import('./editor-module/crud-hero/crud-hero.module')
      .then(m => m.CrudHeroModule) },
  { path: 'weapons', loadChildren: () => import('./editor-module/crud-weapon/crud-weapon.module')
      .then(m => m.CrudWeaponModule) },

  { path: 'edit', loadChildren: () => import('./editor-module/editor-module.module')
      .then(m => m.EditorModuleModule) },

  { path: 'error-pages', loadChildren: () => import ('./error-pages/error-pages.module')
      .then(m => m.ErrorPagesModule) },
  { path: 'game-select/:id', loadChildren: () => import('./game-module/game-module.module')
      .then(m => m.GameModuleModule) },

  { path: 'dashboard', component: DashboardComponent },
  { path: '404', component: NotFound404Component },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
