import { Component, OnInit } from '@angular/core';
import {SendDataThroughComponentsService} from '../Services/send-data-through-components.service';

@Component({
  selector: 'app-games-select',
  templateUrl: './games-select.component.html',
  styleUrls: ['./games-select.component.css']
})
export class GamesSelectComponent implements OnInit {

  data: any;
  heroId?: string;
  constructor(private transfertService: SendDataThroughComponentsService) { }

  ngOnInit(): void {
    this.data = this.transfertService.getData();
    this.transfertService.setData(this.data);
    this.heroId = this.data.heroId;
    console.log(this.data);
  }

}
