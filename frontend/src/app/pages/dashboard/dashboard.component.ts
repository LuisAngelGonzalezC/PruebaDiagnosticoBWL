import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { pending, completed } from '../../data/tasks';
import { CountryService } from 'src/app/services/country.service';
import { CountryModel } from '../../models/country';
import { WeatherService } from 'src/app/services/weather.service';
import { TimezoneModel } from 'src/app/models/timezone';
import { TimezoneService } from 'src/app/services/timezone.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  
  pendingtasks = pending;
  completedtasks = completed;

  code_countries: Array<string> = environment.code_countries;
  countries: Array<CountryModel> = new Array<CountryModel>();
  country: CountryModel = new CountryModel();
  
  timezone: TimezoneModel;
  
  constructor(private countryService: CountryService, private timezoneService: TimezoneService) { }

  ngOnInit(): void {
    this.code_countries.forEach(code => {
      this.countryService.countryByCodeCountry(code)
      .subscribe({
        next: country => {
          const data: CountryModel = {
            name: country.name,
            nameEs:  country.translations.es,
            code: code
          };
          this.countries.push(data);
        },
        error: error => {
          console.log('No se pudo encontrar ningún registro con ese código del país', error);
        },
        complete: () => {
          this.country = this.countries[0];
        }
      });
    });
  }

  changeCountry(country: CountryModel){
    this.country = country;    
  }
  changeTimezone(event) {
    this.timezone = event;    
  }
}