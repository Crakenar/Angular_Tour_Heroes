import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { WeaponComponent} from './weapon/weapon.component';
import {DetailWeaponComponent} from './detail-weapon/detail-weapon.component';
import {AddHeroComponent} from './add-hero/add-hero.component';
import {BattleComponent} from './battle/battle.component';
import {AddWeaponComponent} from './add-weapon/add-weapon.component';
import {VictoryDefeatScreenComponent} from './victory-defeat-screen/victory-defeat-screen.component';

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
  { path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
