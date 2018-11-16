import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-query-interface',
  templateUrl: './query-interface.component.html',
  styleUrls: ['./query-interface.component.css']
})
export class QueryInterfaceComponent implements OnInit {

  results;
  query: string;
  columns;
  error;
  inprogress = false;

  constructor(
    public queryService: QueryService
  ) {
  }

  ngOnInit() {
  }

  getQueryResults() {
    this.inprogress = true;
    this.error = "";
    this.columns = new Array();
    this.results = new Array();
    this.queryService.getQueryResults(this.query).subscribe(
      data => {
        this.results = data;
      },
      (error: HttpResponse<any>) => {
        if (error.status === 400) {
          this.error = "No query specified or query contains illegal operations (no modifications allowed)"
        } else {
          this.error = error['error']
        }
      },
      () => {
        for(let row of this.results) {
          for(let col in row) {
            this.columns.push(col)
          }
          break;
        }
        this.inprogress = false;
      }
    );
  }
}
