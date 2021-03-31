import { Injectable } from '@angular/core';
import {MessageService} from './messages.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Boss} from '../data/Boss';

@Injectable({
  providedIn: 'root'
})
export class BossService {
  private static url = 'bosses';

  constructor(private messageService: MessageService, private db: AngularFirestore) { }

  // Récupération des héros
  getBosses(): Observable<Boss[]> {
    return this.db.collection<Boss>(BossService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {
          // console.log('getBosses()');
          return liste.map(item => {
            const data = item.payload.doc.data();
            // console.log(data);
            const boss = new Boss().fromJSON(data);
            const id = item.payload.doc.id;
            boss.id = id;
            return boss;
          });
        })
      );
  }
  // Récupération d'un héro en fonction de son id
  getBoss(id: string): Observable<Boss> {
    return this.getBossDocument(id).snapshotChanges()
      .pipe(
        map(item => {
          const data = item.payload.data();
          const boss = new Boss().fromJSON(data);
          boss.id = id;
          return boss;
        })
      );
  }

  // Ajout d'un héro
  addHero(boss?: Boss): void {
    this.db.collection<Boss>(BossService.url).add(Object.assign({}, boss));
  }

  // Modification d'un héro
  updateBoss(boss?: Boss | undefined): Promise<Boss> {
    // Update document
    // @ts-ignore
    return this.getBossDocument(boss.id).update(Object.assign({}, boss));
   //  return Promise.resolve();
  }

  deleteBoss(id?: string): void {
    this.getBossDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id du héro
  private getBossDocument(id?: string): AngularFirestoreDocument<Boss> {
    // return document
    return this.db.doc<Boss>(BossService.url + `/` + id);
  }

}
