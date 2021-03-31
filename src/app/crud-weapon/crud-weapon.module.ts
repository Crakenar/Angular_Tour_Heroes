import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddWeaponComponent} from './add-weapon/add-weapon.component';
import {DetailWeaponComponent} from './detail-weapon/detail-weapon.component';
import {WeaponComponent} from './weapon/weapon.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';



@NgModule({
  declarations: [
    AddWeaponComponent,
    DetailWeaponComponent,
    WeaponComponent
  ],
  exports: [
    AddWeaponComponent,
    DetailWeaponComponent,
    WeaponComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
})
export class CrudWeaponModule { }
