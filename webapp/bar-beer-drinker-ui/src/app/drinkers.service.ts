import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bill {
  transationid: string;
  issuedby: string;
  date: string;
  hour: string;
  minute: string;
  totalCharge: string;
  tip: string;
}

export interface Drinker {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class DrinkersService {

  constructor(
    public http: HttpClient
  ) {}

  getDrinkerTransactions(drinker: string) {
    return this.http.get<Bill[]>('/api/transactions/' + drinker);
  }

  getDrinkerDetails(drinker: string) {
    return this.http.get<Drinker>('/api/drinker/' + drinker);
  }

  convertTime(hour: string, minute: string) {
    if (Number(minute) < 10) {
      minute = "0" + minute;
    }
    if (Number(hour) <= 12) {
      return hour + ":" + minute + " AM";
    } else {
      return (Number(hour) - 12) + ":" + minute + " PM";
    }
  }
}
