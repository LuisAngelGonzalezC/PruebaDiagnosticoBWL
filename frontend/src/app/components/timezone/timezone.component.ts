import { Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import { TimezoneModel } from 'src/app/models/timezone';
import { TimezoneService } from 'src/app/services/timezone.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})

export class TimezoneComponent implements OnChanges {

  @Input() code: string;
  timezones: Array<any> = new Array<TimezoneModel>();
  timezone: TimezoneModel = new TimezoneModel();
  @Output() eventTimezone = new EventEmitter<TimezoneModel>();

  constructor(private timezoneService: TimezoneService) { }

  ngOnChanges() {
    this.getTimezones();
  }
  
  getTimezones() {
    this.timezones = [];    
    var code = (this.code == undefined) ? environment.default.code_country : this.code;
    
    this.timezoneService.getByCodeCountry(code).subscribe({
      next: (timezones) => {
        timezones.zones.forEach(timezone => {
          var nameWithSlash = timezone.zoneName.split('/');
          var data: TimezoneModel = {
            name: nameWithSlash.slice(-1),
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
      }
    });
  }

  changeTimezone(zone: TimezoneModel) {
    this.timezone = zone;
    this.eventTimezone.emit(this.timezone);
  }
}
