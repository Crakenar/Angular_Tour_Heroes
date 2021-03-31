import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {HeroService} from '../../Services/hero.service';
import {WeaponsService} from '../../Services/weapons.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Weapon} from '../../data/weapon';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero | undefined;
  @Input() weapon: Weapon | undefined;

  // choix weapon pour la mise a jour d'un hero
  weapons: Weapon[] = [];


  public update?: string;
  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponsService,
    private location: Location) { }

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
    this.getIfUpdate();
  }

  getHero(): void{
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString){
      const idInt = +idString;
      this.heroService.getHero(idString)
        .subscribe(hero => {
          this.hero = hero;
          this.weaponService.getWeapon(hero.id_weapon)
            .subscribe(weapon => this.weapon = weapon);
        });
    }
    }


    getIfUpdate(): void {
      const path = this.route.snapshot.url;
      if (path.length === 3){
        this.update = path[2].path;
      }else{
        this.update = '';
      }
    }

  onSubmit(): void {
    this.heroService.updateHero(this.hero);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero);
  }

  getWeapons(): void{
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }
}
