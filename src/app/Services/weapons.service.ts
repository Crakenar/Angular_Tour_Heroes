import { Injectable } from '@angular/core';
import {Weapon} from '../data/Weapon';
import {WEAPONS} from '../data/mock-weapons';
import {Observable, of} from 'rxjs';
import { MessageService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    this.messageService.add('WeaponService: fetched Weapons ');
    return weapons;
  }

  getWeapon(id: number): Observable<Weapon | undefined> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`WeaponService: fetched weapon id=${id}`);
    return of(WEAPONS.find(weapon => weapon.id === id));
  }

  constructor(private messageService: MessageService) { }
}
