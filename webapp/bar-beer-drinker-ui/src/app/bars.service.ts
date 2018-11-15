import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bar {
  name: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  license: string;
  openTime: string;
  closeTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) {}

  getBars() {
    return this.http.get<Bar[]>('/api/bar');
  }

  getBarDetails(bar: string) {
    return this.http.get<Bar>('/api/bar/' + bar);
  }

  getBarTopSpenders(bar: string) {
    return this.http.get<any[]>('/api/bar/topspenders/' + bar)
  }

  getBarTopBeers(bar: string) {
    return this.http.get<any[]>('/api/bar/topbeers/' + bar)
  }

  getBarTopManufacturers(bar: string) {
    return this.http.get<any[]>('/api/bar/topmanufacturers/' + bar)
  }

  getBarBusiestTimes(bar: string) {
    return this.http.get<any[]>('/api/bar/busiesttimes/' + bar)
  }

  convertTime(time: string) {
    if (Number(time) <= 12) {
      return time + ":00 AM";
    } else {
      return (Number(time) - 12) + ":00 PM";
    }
  }

}
