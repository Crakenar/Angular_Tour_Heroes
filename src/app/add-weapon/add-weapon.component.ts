import {Component, Input, OnInit} from '@angular/core';
import {WeaponsService} from '../Services/weapons.service';
import {Weapon} from '../data/weapon';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-weapon',
  templateUrl: './add-weapon.component.html',
  styleUrls: ['./add-weapon.component.css']
})
export class AddWeaponComponent /*implements OnInit*/ {

  profileForm = new FormGroup({
    name: new FormControl(''),
    pv: new FormControl(''),
    esquive: new FormControl(''),
    degats: new FormControl(''),
    attaque: new FormControl(''),
  });  //

  // @Input() name: string | undefined;
  // @Input() pv: number | undefined;
  // @Input() esquive: number | undefined;
  // @Input() degats: number | undefined;
  // @Input() attaque: number | undefined;
  // constructor(private weaponService: WeaponsService) { }
  //
  // ngOnInit(): void {
  // }
  //
  // onSubmit(val: any): void {
  //   weapon.name = val.name;
  //   weapon.pv = val.pv;
  //   weapon.attaque = val.attaque;
  //   weapon.degats = val.degats;
  //   weapon.esquive = val.esquive;
  //   this.weaponService.addWeapon(weapon);
  // }


}
    // const weapon = new Weapon();
