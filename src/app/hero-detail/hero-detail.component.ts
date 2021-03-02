import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {HeroService} from '../Services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero | undefined;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
      this.getHero();
  }

  getHero(): void{
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
     const idInt = +idString;
     this.heroService.getHero(idInt).subscribe(hero => this.hero = hero);
    }
  }
  goBack(): void {
    this.location.back();
  }

}
