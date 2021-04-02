import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AddHeroComponent} from './add-hero/add-hero.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {HeroRoutingModule} from './hero-routing.module';



@NgModule({
  declarations: [
    AddHeroComponent,
    HeroDetailComponent,
    HeroesComponent
  ],
  exports: [
    AddHeroComponent,
    HeroDetailComponent,
    HeroesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HeroRoutingModule
  ]
})
export class CrudHeroModule { }
