import { Component, OnInit } from '@angular/core';
import {SendDataThroughComponentsService} from '../Services/send-data-through-components.service';

@Component({
  selector: 'app-games-select',
  templateUrl: './games-select.component.html',
  styleUrls: ['./games-select.component.css']
})
export class GamesSelectComponent implements OnInit {

  data: any;
  constructor(private transfertService: SendDataThroughComponentsService) { }

  ngOnInit(): void {
    this.data = this.transfertService.getData();
    console.log(this.data);
  }

}
