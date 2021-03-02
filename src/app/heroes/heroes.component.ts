import { Component, OnInit } from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../Services/hero.service';
import {MessageService} from '../Services/messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
/*  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.name} depuis la selection des Heroes`);
  }*/
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  constructor(private messageService: MessageService, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

}
