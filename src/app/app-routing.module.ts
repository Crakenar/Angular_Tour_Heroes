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



// Il faut fair du lazy load avec Children:
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons', component: WeaponComponent },
  { path: 'details/:id', component: HeroDetailComponent },
  { path: 'details/:id/update', component: HeroDetailComponent },
  { path: 'detailsWeapon/:id', component: DetailWeaponComponent },
  { path: 'detailsWeapon/:id/update', component: DetailWeaponComponent },
  { path: 'addHero', component: AddHeroComponent },
  { path: 'addWeapon', component: AddWeaponComponent },
  { path: 'battle/:id', component: BattleComponent },
  { path: 'victory-defeat-screen', component: VictoryDefeatScreenComponent },
  { path: 'game-select', component: GamesSelectComponent },
  { path: 'zelda-game', component: MiniZeldaGameComponent },
  { path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
