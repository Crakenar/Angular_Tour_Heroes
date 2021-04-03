import {Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {Player} from '../Player';

@Component({
  selector: 'app-mini-zelda-game',
 // templateUrl: './mini-zelda-game.component.html',
  template: `
    <canvas #canvas width="1200" height="800"></canvas>
    <button (click)="Play()">Play</button>
  `,
  styleUrls: ['./mini-zelda-game.component.css']
})
export class MiniZeldaGameComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  ctx?: CanvasRenderingContext2D | null;
  requestId: any;
  interval: any;
  player?: Player;
  players: Player[] = [];
  constructor(
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    if (this.canvas){
      this.ctx = this.canvas.nativeElement.getContext('2d');
      if (this.ctx) {
      this.ctx.fillStyle = 'red';
      this.ngZone.runOutsideAngular(() => this.tick());
      setInterval(() => {
          this.tick();
        }, 200);
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
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.player?.draw();
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

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
