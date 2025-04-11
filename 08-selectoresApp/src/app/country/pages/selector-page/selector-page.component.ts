import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country-service.service';
import { E_Region, I_SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: I_SmallCountry[] = [];
  public borders: I_SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region : ['', Validators.required],
    country: ['', Validators.required],
    border : ['', Validators.required]
  })

  constructor (
    private fb: FormBuilder,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): E_Region[] {
    return this.countryService.regions;
  }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.borders = []),
        switchMap( region => this.countryService.getCountriesByRegion(region)),
      )
    .subscribe( countries => {
      this.countriesByRegion = countries;
    })
  }

  onCountryChanged(): void {
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter((value: string) => value.length > 0),
      switchMap( (alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode)),
      switchMap( (country) => this.countryService.getCountryBordersByCodes( country.borders ))
    )
  .subscribe( countries => {
    this.borders = countries;
  })
  }
}
