import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { TimezoneModel } from 'src/app/models/timezone';
import { TimezoneService } from 'src/app/services/timezone.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})

export class ClockComponent implements OnInit, OnChanges {
  
  @Input() timezone: TimezoneModel;
  time;
  timer: any;
  data;
  interval;

  constructor(private timezoneService: TimezoneService) { }
  ngOnInit() {
    this.getTime();
  }
  ngOnChanges(){
    this.getTime();
  }
  getTime() {
    if(this.timezone.zoneName == undefined || this.timezone.zoneName == null){
      this.timezoneService.getByZoneName().subscribe({
        next: data => {
          this.time = data.formatted;
          console.log(data);  
        },
        error: error => {
          console.log('Error en la petición de la zona horaria', error);     
        },
        complete: () => {
          this.setTimer();
        }
      });
    }
    else{
      this.timezoneService.getByZoneName(this.timezone.zoneName).subscribe({
        next: data => {
          this.time = data.formatted;
          console.log(data);  
        },
        error: error => {
          console.log('Error en la petición de la zona horaria', error);     
        },
        complete: () => {
          this.setTimer();
        }
      });
    }
  }
  
  setTimer() {
    this.timer = this.time;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.timer = moment(this.timer).add(1, 'second');
      this.data = moment(this.timer).format('LTS');
    }, 1000);
  }
}
