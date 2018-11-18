import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModificationService {

  constructor(
    public http: HttpClient
  ) { }

  getModificationResults(modification: string) {
    modification = modification.replace("/", "|"); //fix routing issues
    console.log(modification);
    return this.http.get<any[]>('/api/modification/' + modification);
  }
}
