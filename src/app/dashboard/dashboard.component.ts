import {Component, OnInit} from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../Services/hero.service';
import {Observable} from 'rxjs';
import {ErrorHandlerService} from '../Services/error-handler.service';
import {Router} from '@angular/router';
import {SendDataThroughComponentsService} from '../Services/send-data-through-components.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemFireBase?: Observable<any[]>;
  heroes?: Hero[] = [];
  heroMostUsed?: any;
  errorMessage = '';

  constructor(
    private router: Router,
    private transfertService: SendDataThroughComponentsService,
    private heroService: HeroService,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getHeroMaxUse();
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
      this.heroMostUsed = heroes.sort((a: Hero, b: Hero) => b.usage - a.usage).splice(0, 1);
      },
      (error) => {
        this.errorService.handleError(error);
        this.errorMessage = this.errorService.errorMessage;
      }
      );
  }

  getHeroMaxUse(): void {
    if (this.heroes) {
      const maxUsage = this.heroes.reduce((f: number, hero: Hero) => (hero.usage > f ? hero.usage : f), 1);
      this.heroMostUsed = this.heroes.find(o => {
        return o.usage === maxUsage;
      });
    }
  }

  addUsageHero(id?: string): void{
    if (this.heroes){
      this.heroes.forEach( value => {
        if (value.id === id){
          value.usage++;
          this.heroService.updateHero(value);
        }
      });
      this.router.navigate(['game-select/' + id]);
      this.transfertService.setData({
        idHero : id
      });
    }
  }

}
