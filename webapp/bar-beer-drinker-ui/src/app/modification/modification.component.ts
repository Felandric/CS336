import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ModificationService } from '../modification.service';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {

  result: string;
  modification: string;
  inprogress = false;

  constructor(
    public modificationService: ModificationService
  ) { }

  ngOnInit() {
  }

  getModificationResults() {
    this.inprogress = true;
    this.modificationService.getModificationResults(this.modification).subscribe(
      data => {
        let rowsMatched = data['rows'];
        this.result = rowsMatched + " rows changed"
      },
      (error: HttpResponse<any>) => {
        this.result = error['error'];
      },
      () => {
        this.inprogress = false;
      }
    );
  }

}
