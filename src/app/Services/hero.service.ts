import { Injectable } from '@angular/core';
import {Hero} from '../data/hero';
import {Observable, of} from 'rxjs';
import { MessageService } from './messages.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private static url = 'heroes';

  constructor(private messageService: MessageService, private db: AngularFirestore) { }

  /*getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }*/

  // Récupération des héros
  getHeroes(): Observable<Hero[]> {

    //
    return this.db.collection<Hero>(HeroService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {
          // log
          console.log('getHeroes()');
          // Traitement de la liste
          return liste.map(item => {
            // Get document data
            const data = item.payload.doc.data();
            // New Hero
            console.log(data);
            const hero = new Hero().fromJSON(data);
            // Get document id
            const id = item.payload.doc.id;
            // Hero. id = number or Firebase id = string
            // hero.id = +id;
            hero.id = id;
            // log
            console.log('   hero ' + id);
            console.log(hero);
            // Use spread operator to add the id to the document data
            return hero;

          });
        })
      );
  }
  // Récupération d'un héro en fonction de son id
  getHero(id: string): Observable<Hero> {
    // Return hero observable
    return this.getHeroDocument(id).snapshotChanges()
      .pipe(
        map(item => {
          // Get document data
          const data = item.payload.data();
          // New Hero
          const hero = new Hero().fromJSON(data);
          hero.id = id;
          // log
          console.log('getHero(' + id + ')');
          console.log(hero);
          // Use spread operator to add the id to the document data
          return hero;
        })
      );
  }

  // Ajout d'un héro
  addHero(hero: Hero): void {
    this.db.collection<Hero>(HeroService.url).add(Object.assign({}, hero));
  }

  // Modification d'un héro
  updateHero(hero: Hero | undefined): void {

    // Update document
    // @ts-ignore
    this.getHeroDocument(hero.id).update(Object.assign({}, hero));
  }

  // Suppression d'un héro
  deleteHero(id: string): void {

    // Delete the document
    this.getHeroDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id du héro
  private getHeroDocument(id: string): AngularFirestoreDocument<Hero> {

    // return document
    return this.db.doc<Hero>(HeroService.url + `/` + id);
  }
}

/*  getHero(id: number): Observable<Hero | undefined> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // @ts-ignore
    return of(HEROES.find(hero => hero.id === id));
  }


}*/
