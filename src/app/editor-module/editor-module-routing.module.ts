import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditChoiceComponent} from './edit-choice/edit-choice.component';



const routes: Routes = [
  { path: '', component:  EditChoiceComponent },
  { path: 'heroes', loadChildren: () => import('./crud-hero/crud-hero.module')
       .then(m => m.CrudHeroModule) },
  { path: 'weapons', loadChildren: () => import('./crud-weapon/crud-weapon.module')
       .then(m => m.CrudWeaponModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorModuleRoutingModule { }
