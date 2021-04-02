import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AddHeroComponent } from './add-hero/add-hero.component';

const routes: Routes = [
  { path: '', component: HeroesComponent },
  { path: 'addHero', component: AddHeroComponent},
  { path: 'details/:id', component: HeroDetailComponent },
  { path: 'details/:id/update', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }
