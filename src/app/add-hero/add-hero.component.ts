import { Component, OnInit, Input } from '@angular/core';
import {HeroService } from '../Services/hero.service';
import { Hero } from '../data/hero';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {

  @Input() name: string | undefined;
  @Input() pv: number | undefined;
  @Input() esquive: number | undefined;
  @Input() degats: number | undefined;
  @Input() attaque: number | undefined;
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
  }

  onSubmit(val: any): void {
    console.log(val);
    const hero = new Hero();
    hero.name = val.name;
    hero.pv = val.pv;
    hero.attaque = val.attaque;
    hero.degats = val.degats;
    hero.esquive = val.esquive;
    hero.arme = 'Hache';
    hero.points = 40;
    this.heroService.addHero(hero);
  }
}
