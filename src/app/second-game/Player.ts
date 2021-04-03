export class Player {
  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 30; // pour le css z-index

  constructor(private ctx: CanvasRenderingContext2D) {
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

  draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }
}
