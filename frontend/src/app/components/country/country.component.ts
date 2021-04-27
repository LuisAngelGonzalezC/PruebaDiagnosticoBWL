import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit{
  
  @Input() code: string;
  @Input() nameEs: string;

  constructor() { }

  ngOnInit(){
    this.code = (this.code == undefined) ? environment.default.code_country : this.code;
  }
}
