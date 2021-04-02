import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { WeaponComponent } from './weapon/weapon.component';
import { DetailWeaponComponent } from './detail-weapon/detail-weapon.component';
import { AddWeaponComponent } from './add-weapon/add-weapon.component';

const routes: Routes = [
  { path: '', component:  WeaponComponent},
  { path: 'addWeapon', component:  AddWeaponComponent},
  { path: 'detailsWeapon/:id', component:  DetailWeaponComponent},
  { path: 'detailsWeapon/:id/update', component:  DetailWeaponComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeaponRoutingModule { }
