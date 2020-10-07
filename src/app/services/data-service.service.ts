import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { count } from 'console';
import { map } from 'rxjs/operators';
import { globalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private  globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-05-2020.csv'

  constructor( private http: HttpClient) { }

  getGlobalData(){
    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        let raw = {}
        let data: globalDataSummary[] = [];
        let rows = result.split('\n');
        rows.splice(0, 1);
        // console.log(rows);

        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/)
          let cs = {
            country : cols[3],
            confirmed: +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10],
          };
          let temp = raw[cs.country];
          if(temp) {
            temp.active += cs.active
            temp.confirmed += cs.confirmed
            temp.deaths += cs.active
            temp.recovered += cs.active

            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
          raw[cs.country] = cs; 
          // data.push()
        })
        // console.log(raw);
        return <globalDataSummary[]>Object.values(raw); 
      })
    )
  }

}
