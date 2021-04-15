export class Player {
  private color;
  private x = 0;
  private y = 0;
  private z = 30;

  constructor(private ctx: CanvasRenderingContext2D, private colorC: string, private xC: number, private yC: number) {
    this.color = colorC;
    this.x = xC;
    this.y = yC;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getZ(): number {
    return this.z;
  }

  setX(positionX: number): void {
    this.x = positionX;
  }

  setY(positionY: number): void {
    this.y = positionY;
  }

  setZ(positionZ: number): void {
    this.z = positionZ;
  }

  moveRight(): void{
    this.x++;
    this.draw();
  }

  moveLeft(): void {
    this.x--;
    this.draw();
  }

  moveUp(): void {
    this.y--;
    this.draw();
  }

  moveDown(): void {
    this.y++;
    this.draw();
  }

  randomMove(): void {
    const rand = Math.floor(Math.random() * 4);
    switch (rand){
      case 0:
        this.moveRight();
        break;
      case 1:
        this.moveLeft();
        break;
      case 2:
        this.moveDown();
        break;
      case 3:
        this.moveUp();
        break;
    }
  }

  colision(boss: Player): boolean {
    if (boss.getX() + 1 > this.getX() &&
      boss.getX() - 1 < this.getX() &&
      boss.getY() + 1 > this.getY() &&
      boss.getY() - 1 < this.getY()){
      return true;
    }
    return false;
  }

  // boss == boss
  // this. == user
  wichMoveX(boss: Player): void {
    const xB = boss.getX();
    if (xB > this.getX()){
      boss.moveLeft();
    }else if (xB < this.getX()) {
      boss.moveRight();
    }
  }

  wichMoveY(boss: Player): void {
    const yB = boss.getY();
    if (yB > this.getY()){
      boss.moveUp();
    }else if (yB < this.getY()) {
      boss.moveDown();
    }
  }

  getDistance(player: Player): number {
    const xBoss = player.getX();
    const yBoss = player.getY();
    const xP = this.getX();
    const yP = this.getY();
    return Math.sqrt(Math.pow(xBoss - xP, 2) + Math.pow(yBoss - yP, 2));
  }

  draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }
}
