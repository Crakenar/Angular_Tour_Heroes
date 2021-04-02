import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InternalServerComponent} from './internal-server/internal-server.component';
import {NotFound404Component} from './not-found404/not-found404.component';



const routes: Routes = [
  { path: '404', component:  InternalServerComponent},
  { path: '500', component:  NotFound404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorPagesRoutingModule { }
