import { Component, OnInit } from '@angular/core';
import { globalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data: globalDataSummary[];
  countryList : string[] = [];

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  constructor( private service : DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result => {
      this.data = result;  
      this.data.forEach(cs => {
        this.countryList.push(cs.country)
      })
    })
  }

  updateValues( country : string ) {
    console.log(country);
    this.data.forEach(cs => {
      if(cs.country == country){
        this.totalActive = cs.active;
        this.totalRecovered = cs.recovered;
        this.totalDeaths = cs.deaths;
        this.totalConfirmed= cs.confirmed;
      }
    })
  }

}
