import { Country } from '../../interfaces/country';
import { CountryService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor ( private countryService: CountryService ) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  searchByCapital ( term: string ): void {

    this.isLoading = true;

    this.countryService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
