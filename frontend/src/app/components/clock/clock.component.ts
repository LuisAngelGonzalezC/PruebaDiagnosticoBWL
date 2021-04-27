import { Component, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { TimezoneModel } from 'src/app/models/timezone';
import { TimezoneService } from 'src/app/services/timezone.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})

export class ClockComponent implements OnChanges {
  
  @Input() timezone: TimezoneModel;
  time: any;
  timer: any;
  timerLTS: any;
  interval: any;
  loadingClock: boolean = false;
  error: boolean = false;

  constructor(private timezoneService: TimezoneService) { }
  
  ngOnChanges(){
    this.getTime();
  }
  
  getTime() {
    this.error = false;
    this.loadingClock = true;
    var zoneName = (this.timezone == undefined) ? environment.default.zoneName : this.timezone.zoneName;
    
    this.timezoneService.getByZoneName(zoneName).subscribe({
      next: data => {
        this.time = data.formatted;
        this.loadingClock = false;
      },
      error: error => {
        console.log('Error en la petición de la zona horaria', error);
        this.error = true;
        this.loadingClock = false;    
      },
      complete: () => {
        this.setTimer();
      }
    });
  }
  
  setTimer() {
    this.timer = this.time;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.timer = moment(this.timer).add(1, 'second');
      this.timerLTS = moment(this.timer).format('LTS');
    }, 1000);
  }
}
