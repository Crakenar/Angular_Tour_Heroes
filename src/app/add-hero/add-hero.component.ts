import { Component, OnInit, Input } from '@angular/core';
import {HeroService } from '../Services/hero.service';
import { Hero } from '../data/hero';
import {Weapon} from '../data/weapon';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {

  @Input() name: string | undefined;
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const hero = new Hero();
    hero.points = 40;
    this.heroService.addHero(hero);
  }
}
