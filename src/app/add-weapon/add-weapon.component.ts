import {Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges} from '@angular/core';
import {WeaponsService} from '../Services/weapons.service';
import { Weapon } from '../data/weapon';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-weapon',
  templateUrl: './add-weapon.component.html',
  styleUrls: ['./add-weapon.component.css']
})
export class AddWeaponComponent implements OnInit {
  private static INITIAL_POINTS = 0;

  weaponForm: FormGroup;
  sommeTotalePoints: number;
  constructor(private weaponService: WeaponsService, public formBuilder: FormBuilder, private location: Location) {
    this.sommeTotalePoints = AddWeaponComponent.INITIAL_POINTS;
    this.weaponForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      pv: ['', [Validators.required, Validators.min(-5), Validators.max(5)]],
      attaque: ['', [Validators.required, Validators.min(-5), Validators.max(5)]],
      degats: ['', [Validators.required, Validators.min(-5), Validators.max(5)]],
      esquive: ['', [Validators.required, Validators.min(-5),  Validators.max(5)]],
    });
  }

  ngOnInit(): void {
    this.sommeTotalePoints = AddWeaponComponent.INITIAL_POINTS;
    this.onChangesForm();
  }

  // tslint:disable-next-line:typedef
  get getControl(){
    return this.weaponForm.controls;
  }

  onChangesForm(): void {
    this.weaponForm.valueChanges.subscribe(value => {
      // // console.log(value);
      // console.log(this.weaponForm.controls);
      this.sommeTotalePoints = AddWeaponComponent.INITIAL_POINTS;
      this.sommeTotalePoints =  value.pv + value.attaque + value.esquive + value.degats;
    });
  }

  onSubmit(): void {
    const weapon = this.weaponForm.value;
    this.weaponService.addWeapon(weapon);
    alert('Arme enregistree');
  }

  goBack(): void {
    this.location.back();
  }
}
