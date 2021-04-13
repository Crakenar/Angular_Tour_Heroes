import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {HeroService} from '../../Services/hero.service';
import {WeaponsService} from '../../Services/weapons.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Weapon} from '../../data/weapon';
import {FirestoreImageService} from '../../Services/firestore-image.service';

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
  pathImageFirestore?: string | undefined | null;
  selectedFile = null;
  urlImageHtml?: string;
  event: any;


  public update?: string;
  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponsService,
    private imageService: FirestoreImageService,
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
          if (hero.imageURL){
            this.imageService.getImage(hero.imageURL)
              .subscribe(u => this.urlImageHtml = u);
          }
          if (this.urlImageHtml === '' || this.urlImageHtml == null){
            this.urlImageHtml = 'assets/unknownImage.png';
          }
        });
    }
  }

  onselectImage(event: any): void{
    if (event.target.files){
      this.selectedFile = event.target.files[0];
      this.event = event;
      // Preview
      if (this.selectedFile){
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (events: any) => {
          this.urlImageHtml = events.target.result;
        };
      }
    }
  }

  deleteImage(): void {
    this.imageService.deleteImage(this.hero?.imageURL);
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
    if (this.hero){
      this.hero.imageURL = this.imageService.uploadImage(this.event);
      console.log(this.hero.imageURL);
      if (!this.hero.imageURL){ this.hero.imageURL = 'assets/unknownImage.png'; }
      this.heroService.updateHero(this.hero);
    }
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
