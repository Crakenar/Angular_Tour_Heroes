import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {HeroService} from '../Services/hero.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero | undefined;
  public update?: string;
  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
      this.getHero();
      this.getIfUpdate();
  }

  getHero(): void{
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      const idInt = +idString;
      this.heroService.getHero(idString)
        .subscribe(hero => this.hero = hero);
    }

    }
    getIfUpdate(): void {
      const path = this.route.snapshot.url;
      console.log(path);
      if (path.length === 3){
        this.update = path[2].path;
      }else{
        this.update = '';
      }
    }

  onSubmit(val: any): void {
    console.log(this.hero);
    this.heroService.updateHero(this.hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero);
  }

}
