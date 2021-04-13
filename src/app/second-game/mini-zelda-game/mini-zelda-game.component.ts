import {Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {Player} from '../Player';
import {HeroService} from '../../Services/hero.service';
import {Hero} from '../../data/hero';
import {Boss} from '../../data/Boss';
import {BossService} from '../../Services/boss.service';
import {finalize, first} from 'rxjs/operators';
import {SendDataThroughComponentsService} from '../../Services/send-data-through-components.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WeaponsService} from '../../Services/weapons.service';
import {Weapon} from '../../data/weapon';

@Component({
  selector: 'app-mini-zelda-game',
  // templateUrl: './mini-zelda-game.component.html',
  template: `
    <div class="row" style="margin-right: 6px">
      <div class="col-lg-2">
        <div *ngIf="hero">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://image.freepik.com/vecteurs-libre/couple-super-heros_1284-16926.jpg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{hero.name}}</h5>
              <ul class="list-group">
                <li class="list-group-item">Attaque : {{hero.attaque}}</li>
                <li class="list-group-item">PV : {{hero.pv}}</li>
                <li class="list-group-item">Esquive : {{hero.esquive}}</li>
                <li class="list-group-item" *ngIf="weapon">Arme : {{weapon.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <button style="margin-left: 45%" nbButton outline status="danger" (click)="Play()">Play</button>
        <!--GAME-->
        <canvas style="margin-left: 5%" #canvas width="1000" height="800"></canvas>
      </div>
      <div class="col-lg-2">
        <!--COTE BOSS-->
        <div *ngIf="bosses">
          <!--AFFICHAGE DU BOSS EN COURS-->
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://image.freepik.com/vecteurs-libre/couple-super-heros_1284-16926.jpg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{bosses[0]?.name}}</h5>
              <ul class="list-group">
                <li class="list-group-item">Attaque : {{bosses[0]?.attaque}}</li>
                <li class="list-group-item">PV : {{bosses[0]?.pv}}</li>
                <li class="list-group-item">Esquive : {{bosses[0]?.esquive}}</li>
                <li class="list-group-item">Nombre de Victoire : {{bosses[0]?.nbrVictoire}}</li>
                <li class="list-group-item">Vaincu : {{bosses[0]?.vaincu}}</li>
              </ul>
            </div>
          </div>
          <!--AFFICHAGE DE LA LISTE DES BOSS-->
          <div> <!--ngForOf-->
            Boss Restants
            <ul class="list-group">
              <div *ngFor="let boss of bosses | slice:1; let i = index;">
                <a href="" id="{{boss.id}}"
                   style="text-decoration: none"><li class="list-group-item"> {{boss.name}}</li>
                </a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
   `,
  styleUrls: ['./mini-zelda-game.component.css']
})
export class MiniZeldaGameComponent implements OnInit {

  private static FPS = 60;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;

  // Variable html
  hero: Hero = {} as Hero;
  bosses: Boss[] = [];
  data: any;
  heroId?: string | null;
  weapon?: Weapon;

  // Variable Game CANVAS
  player?: Player;
  players: Player[] = [];
  boss?: Player;
  ctx?: CanvasRenderingContext2D | null;
  requestId: any;
  interval: any;

  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private bossService: BossService,
    private weaponService: WeaponsService,
    private transfertService: SendDataThroughComponentsService,
  ) { }

  ngOnInit(): void {
    // this.data = this.transfertService.getData();
    // this.heroId = this.route.params.subscribe(param => this.heroId = param);
    this.heroId = this.route.snapshot.paramMap.get('id');
    this.getBosses();
    if (this.heroId) {
      this.getHero(this.heroId);
      this.getWeapon();
    }
    if (this.canvas){
      this.ctx = this.canvas.nativeElement.getContext('2d');
      if (this.ctx) {
      this.ctx.fillStyle = 'red';
      this.ngZone.runOutsideAngular(() => this.tick());
      setInterval(() => {
          this.tick();
        }, 1000 / MiniZeldaGameComponent.FPS);
      }
    }
  }

  Play(): void {
    // console.log('play' + this.ctx);
    if (this.ctx){
      const player = new Player(this.ctx, 'green', 0, 0);
      this.player = player;
      const boss = new Player(this.ctx, 'red', this.ctx.canvas.width / 30 - 1, 0);
      this.boss = boss;
     // this.players = this.players.concat(player);
    }
  }

  private tick(): void {
    if (this.ctx && this.player && this.boss) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.player?.draw();
      this.boss.draw();
      if (this.player?.getX() * this.player?.getZ() > this.ctx?.canvas.width) {
        this.player.setX(0);
      }
      if (this.player?.getX() * this.player?.getZ() < 0){
        this.player.setX(this.ctx.canvas.width / this.player.getZ() - 1 );
      }
      if (this.player?.getY() * this.player?.getZ() > this.ctx.canvas.height) {
        this.player.setY(0);
      }
      if (this.player?.getY() * this.player?.getZ() < 0) {
        this.player.setY(this.ctx.canvas.height / this.player.getZ() - 1);
      }




      if (this.boss?.getX() * this.boss?.getZ() > this.ctx?.canvas.width) {
        this.boss.setX(0);
      }
      if (this.boss?.getX() * this.boss?.getZ() < 0){
        this.boss.setX(this.ctx.canvas.width / this.boss.getZ() - 1 );
      }
      if (this.boss?.getY() * this.boss?.getZ() > this.ctx.canvas.height) {
        this.boss.setY(0);
      }
      if (this.boss?.getY() * this.boss?.getZ() < 0) {
        this.boss.setY(this.ctx.canvas.height / this.boss.getZ() - 1);
      }
    }
  }

  // faire avec keyCode pour un meiller corss platform mais keycode n'est plus supporte
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
      switch (event.code) {
        case 'KeyD':
        case 'ArrowRight':
          this.player?.moveRight();
          this.bossMovement();
          this.bossRespwanGraphic();
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.player?.moveLeft();
          this.bossMovement();
          this.bossRespwanGraphic();
          break;
        case 'KeyW':
        case 'ArrowUp':
          this.player?.moveUp();
          this.bossMovement();
          this.bossRespwanGraphic();
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.player?.moveDown();
          this.bossMovement();
          this.bossRespwanGraphic();
          break;
        case 'Space':
          break;
      }
  }
  public bossMovement(): void {
    if (this.boss){
      this.player?.wichMoveX(this.boss);
      this.player?.wichMoveY(this.boss);
    }
  }
  public bossRespwanGraphic(): void {
    if (this.boss) {
      if (this.player?.colision(this.boss) && this.bosses[0].pv && this.ctx){
        this.bosses[0].pv -= 100;
        this.boss.setX(Math.random() * this.ctx?.canvas.width / 30);
        this.boss.setY(Math.random() * this.ctx?.canvas.height / 30);
      }
    }
  }

  public getHero(idHero: string): void {
     this.heroService.getHero(idHero)
       .subscribe(hero => {
         this.hero = hero;
         this.getWeapon();
     });
  }

  public getBosses(): void {
    this.bossService.getBosses().pipe(first()).subscribe(bosses => this.bosses = bosses);
  }

  public getWeapon(): void {
    this.weaponService.getWeapon(this.hero.id_weapon).subscribe(weapon => this.weapon = weapon);
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
