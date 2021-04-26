import { Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { TimezoneModel } from 'src/app/models/timezone';
import { TimezoneService } from 'src/app/services/timezone.service';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})

export class TimezoneComponent implements OnChanges {

  @Input() code: string = 'MX';
  timezones: Array<any> = new Array<TimezoneModel>();
  timezone: TimezoneModel = new TimezoneModel();
  @Output() eventTimezone = new EventEmitter<TimezoneModel>();

  constructor(private timezoneService: TimezoneService) { }

  ngOnChanges() {
    this.getTimezones(); 
  }

  getTimezones() {
    this.timezones = [];
    this.timezoneService.getByCodeCountry(this.code).subscribe({
      next: timezones => {
        timezones.zones.forEach(timezone => {
          var nameWithSlash = timezone.zoneName.split('/');
          var name = nameWithSlash.slice(-1);
          var data: TimezoneModel = {
            name: name[0],
            zoneName: timezone.zoneName
          }
          this.timezones.push(data);
        });
      },
      error: error => {
        console.log('Error en la petición para obtener las zonas horarias.', error);
      },
      complete: () => {
        this.timezone = this.timezones[0];
        this.timezoneService.timezone;
      }
    });
  }

  changeTimezone(zone: TimezoneModel) {
    this.timezone = zone;
    this.timezoneService.timezone = this.timezone;
    this.eventTimezone.emit(this.timezone);
  }
}
