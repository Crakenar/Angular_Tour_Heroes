import {Component, OnInit} from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../Services/hero.service';
import {MessageService} from '../Services/messages.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {filter, max} from 'rxjs/operators';
import {InternalServerComponent} from '../error-pages/internal-server/internal-server.component';
import {ErrorHandlerService} from '../Services/error-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemFireBase?: Observable<any[]>;
  heroes: Hero[] = [];
  heroMostUsed?: any;
  errorMessage = '';

  constructor(
    private messageService: MessageService,
    private heroService: HeroService,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getHeroMaxUse();
    // this.getHeroMaxUse();
  }


  getHeroes(): void {
    // take(5)
    this.heroService.getHeroes().subscribe(heroes => {
        this.heroes = heroes.sort((a: Hero, b: Hero) => b.usage - a.usage).splice(0, 5);
    },
    (error) => {
      this.errorService.handleError(error);
      this.errorMessage = this.errorService.errorMessage;
    }
      );
    this.heroService.getHeroes().subscribe(heroes => {
      // do stuff using data
      // tslint:disable-next-line:no-shadowed-variable
      this.heroMostUsed = heroes.sort((a: Hero, b: Hero) => b.usage - a.usage).splice(0, 1);
      },
      (error) => {
        this.errorService.handleError(error);
        this.errorMessage = this.errorService.errorMessage;
      }
      );
  }

  getHeroMaxUse(): void {
    // tslint:disable-next-line:no-shadowed-variable
    const maxUsage = this.heroes.reduce((max: number, hero: Hero) => (hero.usage > max ? hero.usage : max), 1);
    this.heroMostUsed = this.heroes.find(o => {
      return o.usage === maxUsage;
    });
    // console.log('after content' + this.heroes);
  }

}
