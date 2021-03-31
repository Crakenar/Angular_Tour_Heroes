import {Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges} from '@angular/core';
import {HeroService } from '../Services/hero.service';
import { Hero } from '../data/hero';
import {WeaponsService} from '../Services/weapons.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Weapon} from '../data/weapon';

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

  constructor(private heroService: HeroService, public formBuilder: FormBuilder, private weaponService: WeaponsService) {
    this.nbrPointRestant = AddHeroComponent.INITIAL_POINTS;
    this.heroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      pv: ['', [Validators.required, Validators.min(1), Validators.max(37)]],
      attaque: ['', [Validators.required, Validators.min(1), Validators.max(37)]],
      degats: ['', [Validators.required, Validators.min(1), Validators.max(37)]],
      esquive: ['', [Validators.required, Validators.min(1), Validators.max(37)]],
      weapon: ['', [Validators.required]],
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

  onChangesForm(): void {
    this.heroForm.valueChanges.subscribe(value => {
      // // console.log(value);
      // console.log(this.heroForm.controls);
      this.nbrPointRestant = AddHeroComponent.INITIAL_POINTS;
      this.nbrPointRestant = this.nbrPointRestant - value.pv - value.attaque - value.esquive - value.degats;
    });
  }

  getWeapons(): void{
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }

  onSubmit(): void {
    const hero = this.heroForm.value;
    this.heroService.addHero(hero);
  }

}
