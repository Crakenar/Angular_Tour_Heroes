import { Component, OnInit } from '@angular/core';
import {SendDataThroughComponentsService} from '../Services/send-data-through-components.service';

@Component({
  selector: 'app-victory-defeat-screen',
  templateUrl: './victory-defeat-screen.component.html',
  styleUrls: ['./victory-defeat-screen.component.css']
})
export class VictoryDefeatScreenComponent implements OnInit {
  private data: any;
  constructor(
    private transfertService: SendDataThroughComponentsService
  ) { }

  ngOnInit(): void {
    this.data = this.transfertService.getData();
    console.log(this.data);
  }

}
