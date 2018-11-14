import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-query-interface',
  templateUrl: './query-interface.component.html',
  styleUrls: ['./query-interface.component.css']
})
export class QueryInterfaceComponent implements OnInit {

  results: any[];
  query: string;
  columns: Array<string>;

  constructor(
    public queryService: QueryService,
  ) {
  }

  ngOnInit() {
  }

  getQueryResults() {
    this.queryService.getQueryResults(this.query).subscribe(
      data => {
        this.results = data;
      },
      (error: HttpResponse<any>) => {
        this.results = null;
        if (error.status === 404) {
          alert("No results")
        } else if (error.status === 400){
          alert("Invalid query (no modifications allowed)")
        } else {
          console.error(error.status + " - " + error.body);
          alert("An error occurred on the server. Please check the console.")
        }
      }
    );

    for(let row of this.results) {
      for(let col in row) {
        this.columns.push(col)
      }
      break;
    }
    console.log(this.columns);
    this.query = "";
  }

}
