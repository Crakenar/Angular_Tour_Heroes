import { Component, OnInit } from '@angular/core';
import {SendDataThroughComponentsService} from '../Services/send-data-through-components.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-games-select',
  templateUrl: './games-select.component.html',
  styleUrls: ['./games-select.component.css']
})
export class GamesSelectComponent implements OnInit {

  data: any;
  heroId = '';
  constructor(
    private transfertService: SendDataThroughComponentsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      this.heroId = idString;
    }
    // possibilite de 500 error car on n'a plus la data
    // on ne passe pas les tests
    /*this.data = this.transfertService.getData();
    this.transfertService.setData(this.data);
    this.heroId = this.data.heroId;
    console.log(this.data);*/
  }

}
