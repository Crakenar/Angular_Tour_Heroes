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
  winner?: string;
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
      if (this.hero !== null){
        // @ts-ignore
        const attaqueDmg = (-this.hero.attaque) + (-this.hero.degats);
        // @ts-ignore
        if (this.bosses.length){
          // @ts-ignore
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
    // @ts-ignore
    if (!this.squares[idx]) {
      // @ts-ignore
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    // @ts-ignore
    this.winner = this.calculateWinner();
    this.attaque();
    if (this.isBossDead()) {
      if (this.bosses.length){
        this.bosses[0].vaincu++;
        this.bosses[0].pv = 1;
        this.bossService.updateBoss(this.bosses[0]).then(
          // @ts-ignore
          this.bosses.splice(0, 1),
          this.checkIfOpponents()
        );
      }
    }
  }


  // Condition on this.bosses Array
  isBossDead(): boolean{
    // @ts-ignore
    return this.bosses[0].pv <= 0;
  }
  checkIfOpponents(): void {
    // @ts-ignore
    if (this.bosses.length === 0){
      this.router.navigate(['/']);
    }
  }

  // tslint:disable-next-line:typedef
  calculateWinner() {
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
      // @ts-ignore
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        // @ts-ignore
        return this.squares[a];
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
