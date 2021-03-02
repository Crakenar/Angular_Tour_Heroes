import { Component, OnInit } from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../Services/hero.service';
import {MessageService} from '../Services/messages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  constructor(private messageService: MessageService, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

}
