import { Component, OnInit } from '@angular/core';
import {Weapon} from '../../../data/weapon';
import {WeaponsService} from '../../../Services/weapons.service';
import {HeroService} from '../../../Services/hero.service';
import {MessageService} from '../../../Services/messages.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {

  weapons: Weapon[] = [];
  usedWeaponsId: string[] = [];
  itemFireBase?: Observable<any[]>;
  sortInput = '';
  private isAscendingSort = false;

  constructor(private messageService: MessageService, private weaponService: WeaponsService, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void{
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }

  delete(id: string): void {
    if (this.isWeaponUsed(id)) {
      alert('Arme est utilisee par un hero. La dessacosier en premier.');
    } else {
      this.weaponService.deleteWeapon(id);
    }
  }

  isWeaponUsed(idWeapon: string): boolean {
    if (this.usedWeaponsId.length === 0) {
      this.heroService.getHeroes().subscribe(heroes => {
        for (const hero of heroes) {
          if (hero.id_weapon != null && hero.id_weapon !== '') {
              this.usedWeaponsId.push(hero.id_weapon);
          }
        }
      });
    }

    return this.usedWeaponsId.includes(idWeapon);
  }
  // Operation on Data
  // https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140
  sortDataBy(attribute?: string): void {
    // console.log('sorting by name');
    /*A FORMALISER C'EST PAS BEAU*/
    this.isAscendingSort = !this.isAscendingSort;
    switch (attribute){
      case 'name' :
        this.weapons.sort((weapon1: any, weapon2: any) => this.compare(weapon1.name, weapon2.name));
        break;
      case 'attaque':
        this.weapons.sort((weapon1: any, weapon2: any) => this.compareInt(weapon1.attaque, weapon2.attaque));
        break;
      case 'pv':
        this.weapons.sort((weapon1: any, weapon2: any) => this.compareInt(weapon1.pv, weapon2.pv));
        break;
      case 'esquive':
        this.weapons.sort((weapon1: any, weapon2: any) => this.compareInt(weapon1.esquive, weapon2.esquive ));
        break;
      case 'degats':
        this.weapons.sort((weapon1: any, weapon2: any) => this.compareInt(weapon1.degats, weapon2.degats ));
        break;
    }
  }

  compare(item1: any, item2: any): any{
    let compValue;
    compValue = item1.localeCompare(item2, {
      sensitivity: 'base'
    });
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  compareInt(item1: number, item2: number): number{
    let compValue;
    compValue = item1 - item2;
    if (!this.isAscendingSort){
      compValue = compValue * -1;
    }
    return compValue;
  }

}
