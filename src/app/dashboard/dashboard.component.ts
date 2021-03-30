import {Component, OnInit} from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../Services/hero.service';
import {MessageService} from '../Services/messages.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {filter, max} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemFireBase?: Observable<any[]>;
  heroes: Hero[] = [];
  heroMostUsed?: any;
  getHeroes(): void {
    // take(5)
    this.heroService.getHeroes().subscribe(heroes =>
      // do stuff using data
      this.heroes = heroes.sort((a: Hero, b: Hero) => b.usage - a.usage).splice(0, 5)
    );
    this.heroService.getHeroes().subscribe(heroes =>
      // do stuff using data
      // tslint:disable-next-line:no-shadowed-variable
      this.heroMostUsed = heroes.sort((a: Hero, b: Hero) => b.usage - a.usage).splice(0, 1)
    );
  }

/*  getHeroMaxUse(): void {
    // @ts-ignore
    this.heroService.getHeroes().pipe(max<Hero>((a: Hero, b: Hero) => a.usage < b.usage ? -1 : 1))
      .subscribe(hereos => this.heroMostUsed = hereos);
    console.log('most used : ' + this.heroMostUsed);
  }*/

  constructor(private messageService: MessageService, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getHeroMaxUse();
    // this.getHeroMaxUse();
  }

  getHeroMaxUse(): void {
    // tslint:disable-next-line:no-shadowed-variable
    const maxUsage = this.heroes.reduce((max: number, hero: Hero) => (hero.usage > max ? hero.usage : max), 1);
    this.heroMostUsed = this.heroes.find(o => {
      return o.usage === maxUsage;
    });
    console.log('after content' + this.heroes);
  }

}
