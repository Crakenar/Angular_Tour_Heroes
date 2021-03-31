import {Component, OnInit} from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../Services/hero.service';
import {MessageService} from '../Services/messages.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

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

  constructor(private messageService: MessageService, private heroService: HeroService, private router: Router) { }
  ngOnInit(): void {
    this.getHeroes();
  }

  // Operation on Data
  // https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140
  sortDataBy(attribute?: string): void {
    // console.log('sorting by name');
    /*A FORMALISER C'EST PAS BEAU*/
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
      case 'usage':
        this.heroes.sort((hero1: any, hero2: any) => this.compareInt(hero1.usage, hero2.usage ));
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

  addUsageHero(id: string): void{
   this.heroes.forEach( value => {
      if (value.id === id){
        value.usage++;
        this.heroService.updateHero(value);
      }
   });
   this.router.navigate(['/battle/' + id]);
  }


  // Database
  getHeroes(): void {
     this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  delete(id?: string): void {
    this.heroService.deleteHero(id);
  }


}
