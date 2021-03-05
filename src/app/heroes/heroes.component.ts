import { Component, OnInit } from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../Services/hero.service';
import {MessageService} from '../Services/messages.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  itemFireBase?: Observable<any[]>;
  getHeroes(): void {
     this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    // this.itemFireBase = this.firestore.collection('heroes').valueChanges();
     // console.log('heroes component itemfirebase :' + this.itemFireBase);
  }

  delete(id?: string): void {
    this.heroService.deleteHero(id);
  }
  constructor(private messageService: MessageService, private heroService: HeroService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getHeroes();
  }

}
