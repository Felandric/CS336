import { Component, OnInit } from '@angular/core';

import { BeersService, Beer } from '../beers.service';


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  beers: Beer[];

  constructor(
    public beersService: BeersService
  ) {
    this.getBeers();
  }

  ngOnInit() {
  }

  getBeers() {
    this.beersService.getBeers().subscribe(
      data => {
        this.beers = data;
      },
      error => {
        alert('Could not retrieve list of bars')
      }
    );
  }

}
