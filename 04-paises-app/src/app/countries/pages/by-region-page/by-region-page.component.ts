import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Regions } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [ ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Regions[] = ['Africa','Americas','Asia','Europe','Oceania']
  public selectedRegion?: Regions;
  public isLoading: boolean = false;

  constructor ( private countriesService: CountryService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Regions ): void {

    this.selectedRegion = region;
    this.isLoading = true;

    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }

}
