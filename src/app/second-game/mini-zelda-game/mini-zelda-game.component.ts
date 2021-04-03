import {Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {Player} from '../Player';
import {HeroService} from '../../Services/hero.service';
import {Hero} from '../../data/hero';
import {Boss} from '../../data/Boss';
import {BossService} from '../../Services/boss.service';
import {first} from 'rxjs/operators';
import {SendDataThroughComponentsService} from '../../Services/send-data-through-components.service';
import {ActivatedRoute, Router} from '@angular/router';

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
                <li class="list-group-item">Arme : {{hero.id_weapon}}</li>
                <li class="list-group-item">Point restants : {{hero.points}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <button style="margin-left: 45%" nbButton outline status="danger" (click)="Play()">Play</button>
        <!--GAME-->
        <canvas #canvas width="1000" height="800"></canvas>
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
  ctx?: CanvasRenderingContext2D | null;
  requestId: any;
  interval: any;
  hero?: Hero;
  bosses: Boss[] = [];
  player?: Player;
  players: Player[] = [];
  data: any;
  heroId?: string | null;
  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private bossService: BossService,
    private transfertService: SendDataThroughComponentsService,
  ) { }

  ngOnInit(): void {
    // this.data = this.transfertService.getData();
    // this.heroId = this.route.params.subscribe(param => this.heroId = param);
    this.heroId = this.route.snapshot.paramMap.get('id');
    this.getBosses();
    if (this.heroId) {
      this.getHero(this.heroId);
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
      const player = new Player(this.ctx);
      this.player = player;
     // this.players = this.players.concat(player);
    }
  }

  private tick(): void {
    if (this.ctx && this.player) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.player?.draw();
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
    }
  }

  // faire avec keyCode pour un meiller corss platform mais keycode n'est plus supporte
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
      switch (event.code) {
        case 'KeyD':
        case 'ArrowRight':
          this.player?.moveRight();
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.player?.moveLeft();
          break;
        case 'KeyW':
        case 'ArrowUp':
          this.player?.moveUp();
          console.log('move up');
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.player?.moveDown();
          break;
        case 'Space':
          break;
      }
  }

  public getHero(idHero: string): void {
    this.heroService.getHero(idHero).subscribe(hero => this.hero = hero);
  }

  public getBosses(): void {
    this.bossService.getBosses().pipe(first()).subscribe(bosses => this.bosses = bosses);
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
