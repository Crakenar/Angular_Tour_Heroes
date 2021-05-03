import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditChoiceComponent } from './edit-choice/edit-choice.component';
import {EditorModuleRoutingModule} from './editor-module-routing.module';



@NgModule({
  declarations: [
    EditChoiceComponent,
  ],
  imports: [
    EditorModuleRoutingModule,
    CommonModule
  ]
})
export class EditorModuleModule { }
