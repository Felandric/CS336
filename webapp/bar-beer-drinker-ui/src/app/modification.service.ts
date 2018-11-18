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
    modification.replace("/", "|"); //fix routing issues
    return this.http.get<any[]>('/api/modification/' + modification);
  }
}
