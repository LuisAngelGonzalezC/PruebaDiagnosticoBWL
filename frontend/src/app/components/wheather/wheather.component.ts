import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TimezoneModel } from 'src/app/models/timezone';
import { WeatherModel } from 'src/app/models/weather';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.scss']
})

export class WheatherComponent implements OnInit, OnChanges {

  @Input() timezone: TimezoneModel;
  weather: WeatherModel;
  loadingWeather: boolean = false;
  error: boolean = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getWeather();
  }
  
  getWeather() {
    this.error = false;
    this.loadingWeather = true;
    this.weather = new WeatherModel();
    this.weatherService.getByName(this.timezone.zoneName).subscribe({
      next: data => {
        this.weather = {
          temperature: data.current.temp_c,
          text: data.current.condition.text,
          icon: data.current.condition.icon,
        }
        this.loadingWeather = false;
      },
      error: error => {
        this.error = true;
        this.loadingWeather = false;
        console.log(error);       
      }
    });
  }
}
