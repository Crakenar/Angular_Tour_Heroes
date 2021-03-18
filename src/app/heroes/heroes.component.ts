import {Component, OnInit} from '@angular/core';
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
  sortInput = '';
  private isAscendingSort = false;

  constructor(private messageService: MessageService, private heroService: HeroService, private firestore: AngularFirestore) { }
  ngOnInit(): void {
    this.getHeroes();
  }

  // Operation on Data
  // https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140
  sortDataByName(attribute?: string): void {
    console.log('sorting by name');
    this.isAscendingSort = !this.isAscendingSort;
    switch (attribute){
      case 'name' :
        this.heroes.sort((hero1: any, hero2: any) => this.compare(hero1.name, hero2.name));
        break;
      case 'attaque':
        this.heroes.sort((hero1: any, hero2: any) => this.compareInt(hero1.attaque, hero2.attaque));
        break;
      case 'pv':
        this.heroes.sort((hero1: any, hero2: any) => this.compareInt(hero1.pv, hero2.pv));
        break;
      case 'esquive':
        this.heroes.sort((hero1: any, hero2: any) => this.compareInt(hero1.esquive, hero2.esquive ));
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


  // Database
  getHeroes(): void {
     this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    // this.itemFireBase = this.firestore.collection('heroes').valueChanges();
     // console.log('heroes component itemfirebase :' + this.itemFireBase);
  }

  delete(id?: string): void {
    this.heroService.deleteHero(id);
  }


}
