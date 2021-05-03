import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {WeaponsService} from '../../../Services/weapons.service';
import {Weapon} from '../../../data/weapon';

@Component({
  selector: 'app-detail-weapon',
  templateUrl: './detail-weapon.component.html',
  styleUrls: ['./detail-weapon.component.css']
})
export class DetailWeaponComponent implements OnInit {

  @Input() weapon: Weapon | undefined;
  public update?: string;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWeapon();
    this.getIfUpdate();
  }
  getWeapon(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      const idInt = +idString;
      this.weaponService.getWeapon(idString)
        .subscribe(weapon => this.weapon = weapon);
    }
  }

  getIfUpdate(): void {
    const path = this.route.snapshot.url;
    if (path.length === 3 && path[2].path === 'update'){
      this.update = path[2].path;
    }else{
      this.update = '';
    }
  }

  onSubmit(): void {
    this.weaponService.updateWeapon(this.weapon);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
