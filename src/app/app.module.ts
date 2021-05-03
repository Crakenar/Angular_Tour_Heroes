import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

// Pipe
import { FilterPipePipe } from './Pipes/filter-pipe.pipe';

// Components
import { GamesSelectComponent } from './game-module/games-select/games-select.component';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    FilterPipePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
