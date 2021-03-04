import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {WeaponsService} from '../Services/weapons.service';
import {Weapon} from '../data/Weapon';

@Component({
  selector: 'app-detail-weapon',
  templateUrl: './detail-weapon.component.html',
  styleUrls: ['./detail-weapon.component.css']
})
export class DetailWeaponComponent implements OnInit {

  @Input() weapon: Weapon | undefined;
  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWeapon();
  }
  getWeapon(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      const idInt = +idString;
      this.weaponService.getWeapon(idInt).subscribe(weapon => this.weapon = weapon);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
