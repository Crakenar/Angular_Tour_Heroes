import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-carre',
  // templateUrl: './carre.component.html',
  styleUrls: ['./carre.component.css'],
  template: `
    <button nbButton *ngIf="!value">{{ value }}</button>
    <button nbButton hero status="success" *ngIf="value == 'X'">{{ value }}</button>
    <button nbButton hero status="info" *ngIf="value == 'O'">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 5em !important; }']
})
export class CarreComponent implements OnInit {
  @Input() value?: string;
  constructor() { }

  ngOnInit(): void {

  }

}
