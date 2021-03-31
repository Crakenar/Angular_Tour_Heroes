import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../Services/hero.service';
import {Boss} from '../data/Boss';
import {Hero} from '../data/hero';
import {BossService} from '../Services/boss.service';
import {error} from '@angular/compiler/src/util';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  hero: Hero = {} as Hero;
  bosses: Boss[] = [];
  boss?: Boss;
  squares?: string[];
  xIsNext?: boolean;
  winner: string | null | undefined;
  pvBossBase?: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private heroService: HeroService,
              private bossService: BossService) {
  }

  ngOnInit(): void {
    this.getHero();
    this.getBosses();
    this.newGame();
  }
  // Winner = X => Hero attaque boss
  attaque(): void {
    if (this.winner === 'X'){
      if (this.hero && this.hero.attaque && this.hero.degats){
        const attaqueDmg = (-this.hero.attaque) + (-this.hero.degats);
        if (this.bosses.length && this.bosses[0].pv){
          this.bosses[0].pv = this.bosses[0].pv + attaqueDmg;
        }
      }
    }
  }


  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
  }

  get player(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void {
    if (this.squares){
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
      }
    }
    this.winner = this.calculateWinner();
    this.attaque();
    if (this.isBossDead()) {
      if (this.bosses.length){
        this.bosses[0].vaincu++;
        this.bosses[0].pv = 1;
        this.bossService.updateBoss(this.bosses[0]).then( res =>
          this.checkIfOpponents()
        );
      }
    }
  }


  // Condition on this.bosses Array
  isBossDead(): boolean{
    if (this.bosses[0].pv){
      return this.bosses[0].pv <= 0;
    }else{
      return false;
    }
  }
  checkIfOpponents(): void {
    this.bosses.splice(0, 1);
    if (this.bosses.length === 0){
      this.router.navigate(['/']);
    }
  }

  calculateWinner(): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares){
        if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
          return this.squares[a];
        }
      }
    }
    return null;
  }


  // DATA

  getHero(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const idInt = +idString;
      this.heroService.getHero(idString)
        .subscribe(hero => this.hero = hero);
    }
  }

  getBosses(): void{
    // .pipe(first())
    // const x = this.bossService.getBosses().subscribe(bosses => this.bosses = bosses);
    // setTimeout(() => {x.unsubscribe(); } , 1000 );
    // Marche avec Promise<Boss> pour getBosses()
    this.bossService.getBosses().pipe(first()).subscribe(bosses => this.bosses = bosses);
  }

}
