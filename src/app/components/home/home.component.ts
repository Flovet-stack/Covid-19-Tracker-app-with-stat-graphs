import { Component, OnInit } from '@angular/core';
import { globalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  globalData : globalDataSummary[];

  constructor( private dataService: DataServiceService) { }

  listing;
  ngOnInit(): void {

    this.dataService.getGlobalData()
    .subscribe(
     result => {
      console.log(result);

      this.globalData = result;
      result.forEach(cs => {
        if(!Number.isNaN(cs.confirmed)){
          this.totalActive += cs.active
          this.totalConfirmed += cs.active
          this.totalDeaths += cs.active
          this.totalRecovered += cs.active}
      })
     }
    )
  }

}
