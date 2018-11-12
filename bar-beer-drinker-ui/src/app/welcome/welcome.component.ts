import { Component, OnInit } from '@angular/core';

import { BarsService, Bar } from '../bars.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  bars: Bar[];

  constructor(
    public barsService: BarsService
  ) {
    this.getBars();
  }

  ngOnInit() {
  }

  getBars() {
    this.barsService.getBars().subscribe(
      data => {
        this.bars = data;
        for (let bar of this.bars) {
          bar.openTime = this.barsService.convertTime(bar.openTime);
          bar.closeTime = this.barsService.convertTime(bar.closeTime);
        }
      },
      error => {
        alert('Could not retrieve list of bars')
      }
    );
  }

}
