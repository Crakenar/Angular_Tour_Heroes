import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalServerComponent } from './internal-server/internal-server.component';
import { NotFound404Component } from './not-found404/not-found404.component';



@NgModule({
  declarations: [
    InternalServerComponent,
    NotFound404Component
  ],
  exports: [
    InternalServerComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorPagesModule { }
