import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  constructor() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void{
  }
}
