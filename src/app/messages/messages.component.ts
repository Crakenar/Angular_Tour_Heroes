import { Component, OnInit } from '@angular/core';
import {MessageService} from '../Services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {


  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
