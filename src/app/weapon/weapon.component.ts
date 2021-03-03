import { Component, OnInit } from '@angular/core';
import {Weapon} from '../data/Weapon';
import {WeaponsService} from '../Services/weapons.service';
import {MessageService} from '../Services/messages.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {

  weapons: Weapon[] = [];
  getWeapons(): void{
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
}
  constructor(private messageService: MessageService, private weaponService: WeaponsService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

}
