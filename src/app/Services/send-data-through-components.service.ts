import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SendDataThroughComponentsService{

  private data?: any;
  constructor(
    private router: Router,
  ) { }

  setData(data: any): void{
    this.data = data;
  }

  getData(): any{
    const temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(): void{
    this.data = undefined;
  }
}
