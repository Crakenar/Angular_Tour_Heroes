import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

// Pipe
import { FilterPipePipe } from './filter-pipe.pipe';

// Components
import { GamesSelectComponent } from './games-select/games-select.component';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';

import { FirstGameModule } from './first-game/first-game.module';
import { SecondGameModule } from './second-game/second-game.module';
import { CrudHeroModule } from './crud-hero/crud-hero.module';
import { CrudWeaponModule } from './crud-weapon/crud-weapon.module';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    GamesSelectComponent,

    FilterPipePipe,
  ],
  imports: [
    FirstGameModule,
    SecondGameModule,
    CrudHeroModule,
    CrudWeaponModule,

    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
