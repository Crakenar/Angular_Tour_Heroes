import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../../../Services/hero.service';
import {Boss} from '../../../data/Boss';
import {Hero} from '../../../data/hero';
import {BossService} from '../../../Services/boss.service';
import { SendDataThroughComponentsService } from '../../../Services/send-data-through-components.service';
import {first} from 'rxjs/operators';
import {Weapon} from '../../../data/weapon';
import {WeaponsService} from '../../../Services/weapons.service';
import {FirestoreImageService} from '../../../Services/firestore-image.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  private static PV = 1;

  hero: Hero = {} as Hero;
  heroImage?: string;
  bosses: Boss[] = [];
  boss?: Boss;
  weapon?: Weapon;
  squares?: string[];
  heroIsNext?: boolean;
  winner: string | null | undefined;
  pvBossBase?: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private heroService: HeroService,
              private bossService: BossService,
              private weaponService: WeaponsService,
              private transfertService: SendDataThroughComponentsService,
              private imageService: FirestoreImageService,
              ) {
  }

  ngOnInit(): void {
    this.getHero();
    this.getBosses();
    this.newGame();
  }

  /**
   * Game MECHANICS
   */
  // Winner = X => Hero attaque boss
  attack(): void {
    if (this.winner === 'X'){
      if (this.hero && this.hero.attaque && this.hero.degats && this.weapon?.degats && this.weapon?.attaque){
        const attackDmg = (-this.hero.attaque) + (-this.hero.degats) + (-this.weapon?.degats) + (-this.weapon?.attaque);
        if (this.bosses.length && this.bosses[0].pv){
          this.bosses[0].pv = this.bosses[0].pv + attackDmg;
        }
      }
    }else if (this.winner === 'O'){
      if (this.bosses[0] && this.bosses[0].attaque && this.bosses[0].degats){
        const attackDmg = (-this.bosses[0].attaque) + (-this.bosses[0].degats);
        if (this.hero && this.hero.pv){
          this.hero.pv = this.hero.pv + attackDmg;
        }
      }
    }
  }

  // Reset Grille Jeu
  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.heroIsNext = true;
  }

  get player(): string {
    // X = hero
    return this.heroIsNext ? 'X' : 'O';
  }
  // besoin de cliquer pour enclencher le move de l'ordi
  // algo du cul
  makeMove(idx: number): void {
    if (this.squares){
      if (!this.squares[idx]) {
        // si c'est a l'ordinateur de jouer
        if (!this.heroIsNext){
          // il choisit un nombre random entre 0 et 8 (grille du tic tac toe)
          let rand = Math.floor(Math.random() * this.squares.length);
          // tant que le carre correspondant au rand n'est pas vide
          // donc qui n'a pas ete joue
          // alors on rejoue un rand
          // sinon on remplit le carre
          while (this.squares[rand] !== null) {
            rand = Math.floor(Math.random() * this.squares.length);
          }
          this.squares.splice(rand, 1, this.player);
        }else {
          this.squares.splice(idx, 1, this.player);
        }
        console.log('squares after splice : ' + this.squares);
        this.heroIsNext = !this.heroIsNext;
      }
    }
    this.winner = this.calculateWinner();
    this.attack();
    if (this.isBossDead()) {
      if (this.bosses.length){
        this.bosses[0].vaincu++;
        this.bosses[0].pv = BattleComponent.PV;
        this.bossService.updateBoss(this.bosses[0]).then( res =>
          this.checkIfOpponents()
        );
      }
    }else if (this.isHeroDead()){
      if (this.bosses.length){
        this.bosses[0].nbrVictoire++;
        this.bosses[0].pv = BattleComponent.PV;
        this.bossService.updateBoss(this.bosses[0]).then( res =>
          this.checkIfOpponents()
        );
      }
    }
  }


  isHeroDead(): boolean {
    if (this.hero.pv){
      return this.hero.pv <= 0;
    }else{
      return false;
    }
  }

  /**
   * Condition on this.bosses Array
   */
  isBossDead(): boolean{
    if (this.bosses[0].pv){
      return this.bosses[0].pv <= 0;
    }else{
      return false;
    }
  }
  checkIfOpponents(): void {
    if (this.hero && this.hero.pv){
      if (this.hero.pv <= 0){
        this.finishScreen('defeat', this.hero.id);
      }else{
        this.bosses.splice(0, 1);
        if (this.bosses.length === 0){
          this.finishScreen('victory', this.hero.id);
        }else{
          this.newGame();
        }
      }
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
  finishScreen(typeInfo: string, idHero?: string): void {
    this.transfertService.setData({
      typeInfo,
      idHero
    });
    this.router.navigate(['game-select/' + idHero + '/battle/victory-defeat-screen']);
  }

  getHero(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const idInt = +idString;
      this.heroService.getHero(idString)
        .subscribe(hero => {
          this.hero = hero;
          this.getWeapon();
          console.log(hero);
          if (hero.imageURL){
            this.imageService.getImage(hero.imageURL)
              .subscribe(i => this.heroImage = i);
          }
        });
    }
  }

  getBosses(): void{
    // .pipe(first())
    // const x = this.bossService.getBosses().subscribe(bosses => this.bosses = bosses);
    // setTimeout(() => {x.unsubscribe(); } , 1000 );
    // Marche avec Promise<Boss> pour getBosses()
    this.bossService.getBosses().pipe(first()).subscribe(bosses => this.bosses = bosses);
  }

  getWeapon(): void {
    this.weaponService.getWeapon(this.hero.id_weapon).subscribe(weapon => this.weapon = weapon);
  }

}
