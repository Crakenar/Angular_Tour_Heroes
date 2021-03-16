import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import {Weapon} from '../data/weapon';
import { MessageService } from './messages.service';
import {Hero} from '../data/hero';


@Injectable({
  providedIn: 'root'
})
export class WeaponsService {
  private static url = 'weapons';
  constructor(private messageService: MessageService, private db: AngularFirestore) { }

  getWeapons(): Observable<Weapon[]> {
   /* const weapons = of(WEAPONS);
    this.messageService.add('WeaponService: fetched Weapons ');
    return weapons;*/
    return this.db.collection<Weapon>(WeaponsService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {
          // log
          console.log('getWeapons()');
          return liste.map(item => {
            const data = item.payload.doc.data();
            console.log(data);
            const weapon = new Weapon().fromJSON(data);
            const id = item.payload.doc.id;
            weapon.id = id;
            console.log('   weapon ' + id);
            console.log(weapon);
            return weapon;
          });
        })
      );
  }
  getWeapon(id: string): Observable<Weapon> {
    // Return hero observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(item => {
          // Get document data
          const data = item.payload.data();
          // New Hero
          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;
          // log
          console.log('getWeapon(' + id + ')');
          console.log(weapon);
          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }

  addWeapon(weapon?: Weapon): void {
    this.db.collection<Weapon>(WeaponsService.url).add(Object.assign({}, weapon));
  }

  // Modification d'un héro
  updateWeapon(weapon?: Weapon | undefined): void {
    // Update document
    // @ts-ignore
    this.getWeaponDocument(weapon.id).update(Object.assign({}, weapon));
  }

  // Suppression d'un héro
  deleteWeapon(id?: string): void {
    // Delete the document
    this.getWeaponDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id du héro
  private getWeaponDocument(id?: string): AngularFirestoreDocument<Hero> {
    // return document
    return this.db.doc<Weapon>(WeaponsService.url + `/` + id);
  }
  /*getWeapon(id: number): Observable<Weapon | undefined> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`WeaponService: fetched weapon id=${id}`);
    // @ts-ignore
    return of(WEAPONS.find(weapon => weapon.id === id));
  }
*/
}
