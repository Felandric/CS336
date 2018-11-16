import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Beer {
  name: string;
  manufacturer: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(
    public http: HttpClient
  ) {}

  getBeers() {
    return this.http.get<Beer[]>('/api/beer');
  }

  getBeerDetails(beer: string) {
    return this.http.get<Beer>('/api/beer/' + beer);
  }

  getBeerTopBars(beer: string) {
    return this.http.get<any[]>('/api/beer/topbars/' + beer)
  }

  getBeerTopDrinkers(beer: string) {
    return this.http.get<any[]>('/api/beer/topdrinkers/' + beer)
  }

  getBeerBusiestTimes(beer: string) {
    return this.http.get<any[]>('/api/beer/busiesttimes/' + beer)
  }

  getBeerBusiestDays(beer: string) {
    return this.http.get<any[]>('/api/beer/busiestdays/' + beer)
  }

  convertTime(time: string) {
    if (Number(time) <= 12) {
      return time + ":00 AM";
    } else {
      return (Number(time) - 12) + ":00 PM";
    }
  }
}
