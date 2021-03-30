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
  boss?: Boss;
  squares?: string[];
  xIsNext?: boolean;
  winner?: string;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private bossService: BossService) {
  }

  ngOnInit(): void {
    this.getHero();
    this.getBosses();
    this.newGame();
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
  }

  get player(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void{
    // @ts-ignore
    if (!this.squares[idx]) {
      // @ts-ignore
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    // @ts-ignore
    this.winner = this.calculateWinner();
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
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]
      ) {
        // @ts-ignore
        return this.squares[a];
      }
    }
    return null;
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
