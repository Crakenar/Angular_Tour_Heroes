import {Component, OnInit} from '@angular/core';
import {HeroService } from '../../../Services/hero.service';
import {WeaponsService} from '../../../Services/weapons.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Weapon} from '../../../data/weapon';
import {HttpClient} from '@angular/common/http';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FirestoreImageService} from '../../../Services/firestore-image.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {
  private static INITIAL_POINTS = 40;

  heroForm: FormGroup;
  nbrPointRestant: number;
  weapons: Weapon[] = [];
  selectedFile = null;
  urlImageHtml = 'assets/unknownImage.png';
  event: any;


  constructor(
    private heroService: HeroService,
    public formBuilder: FormBuilder,
    private weaponService: WeaponsService,
    private imageService: FirestoreImageService,
    )
  {
    this.nbrPointRestant = AddHeroComponent.INITIAL_POINTS;
    this.heroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      pv: ['', [Validators.required, Validators.min(1), Validators.max(37)]],
      attaque: ['', [Validators.required, Validators.min(1), Validators.max(37)]],
      degats: ['', [Validators.required, Validators.min(1), Validators.max(37)]],
      esquive: ['', [Validators.required, Validators.min(1), Validators.max(37)]],
      imageURL: ['', [Validators.required]],
      id_weapon: [''],
    });
  }

  ngOnInit(): void {
    this.nbrPointRestant = AddHeroComponent.INITIAL_POINTS;
    this.getWeapons();
    this.onChangesForm();
  }

  // tslint:disable-next-line:typedef
  get getControl(){
    return this.heroForm.controls;
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
  }

  onChangesForm(): void {
    this.heroForm.valueChanges.subscribe(value => {
      this.nbrPointRestant = AddHeroComponent.INITIAL_POINTS;
      this.nbrPointRestant = this.nbrPointRestant - value.pv - value.attaque - value.esquive - value.degats;
    });
  }

  getWeapons(): void{
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }

  onSubmit(): void {
    const hero = this.heroForm.value;
    hero.imageURL = this.imageService.uploadImage(this.event);
    if (!hero.imageURL){ hero.imageURL = 'assets/unknownImage.png'; }
    this.heroService.addHero(hero);
  }

}
