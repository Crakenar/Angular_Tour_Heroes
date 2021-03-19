import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../Services/hero.service';
import {Boss} from '../data/Boss';
import {Hero} from '../data/hero';
import {BossService} from '../Services/boss.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  hero?: Hero;
  bosses?: Boss[] = [];

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private bossService: BossService) {
  }

  ngOnInit(): void {
    this.getHero();
    this.getBosses();
  }

  getHero(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const idInt = +idString;
      this.heroService.getHero(idString)
        .subscribe(hero => this.hero = hero);
    }
  }

  getBosses(): void{
    this.bossService.getBosses().subscribe(bosses => this.bosses = bosses);
  }
}
