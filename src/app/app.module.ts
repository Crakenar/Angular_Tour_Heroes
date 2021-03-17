import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeaponComponent } from './weapon/weapon.component';
import { DetailWeaponComponent } from './detail-weapon/detail-weapon.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { AddWeaponComponent } from './add-weapon/add-weapon.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    WeaponComponent,
    DetailWeaponComponent,
    AddHeroComponent,
    AddWeaponComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
