import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { environment } from '../../../environments/environment';
import { pending, completed } from '../../data/tasks';
import { CountryModel } from '../../models/country';
import { TimezoneModel } from 'src/app/models/timezone';

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

  loadingDashboard: boolean;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.getContries();
  }

  getContries(){
    this.loadingDashboard = true;
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
          console.log('No se pudo encontrar ningún registro con ese código del país. Error:');
          console.error(error);
        }
      });
    });
    setTimeout(() => {
      this.country = this.countries[0];
      this.loadingDashboard = false;
    }, 500);
  }
  changeCountry(country: CountryModel){
    this.country = country;    
  }
  changeTimezone(event: TimezoneModel) {
    this.timezone = event;
  }
}