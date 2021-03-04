import { Component, OnInit } from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../Services/hero.service';
import {MessageService} from '../Services/messages.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemFireBase?: Observable<any[]>;
  heroes: Hero[] = [];
  getHeroes(): void {
   this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
   // this.itemFireBase = this.firestore.collection('heroes').valueChanges();
   // console.log('itemfirebase : ' + this.itemFireBase);
  }

  constructor(private messageService: MessageService, private heroService: HeroService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getHeroes();
  }

}
