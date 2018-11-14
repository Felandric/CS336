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

  constructor(
    public queryService: QueryService,
  ) {
  }

  ngOnInit() {
  }

  getQueryResults() {
    this.columns = new Array()
    this.results = new Array();
    this.queryService.getQueryResults(this.query).subscribe(
      data => {
        this.results = data;
      },
      (error: HttpResponse<any>) => {
        if (error.status === 404) {
          alert("No results")
        } else {
          alert("Invalid query - check syntax (no modifications allowed)")
        }
      },
      () => {
        for(let row of this.results) {
          for(let col in row) {
            this.columns.push(col)
          }
          break;
        }
      }
    );
  }
}
