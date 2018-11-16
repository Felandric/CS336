import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar } from '../bars.service';
import { ModificationService } from '../modification.service';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';


declare const Highcharts: any;

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;
  sells;
  itemcounts: number[];
  potentialdrinkers;
  selectedDrinker;
  selectedDate;
  tips = [
    {name:'10%', value:.10},
    {name:'15%', value:.15},
    {name:'20%', value:.20},
  ];
  selectedTip;
  openInt;
  closeInt;

  constructor(
    public barsService: BarsService,
    public modificationService: ModificationService,
    public route: ActivatedRoute
  ) {

    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');
    })

    this.barsService.getBarDetails(this.barName).subscribe(
        data => {
          this.barDetails = data;
          this.openInt = this.barDetails.openTime;
          this.closeInt = this.barDetails.closeTime;
          this.barDetails.openTime = this.barsService.convertTime(this.barDetails.openTime);
          this.barDetails.closeTime = this.barsService.convertTime(this.barDetails.closeTime);
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert("Bar not found")
          } else {
            console.error(error.status + " - " + error.body);
            alert("An error occurred on the server. Please check the console.")
          }
        }
      );

      this.barsService.getBarTopSpenders(this.barName).subscribe(
        data => {
          const drinkers = [];
          const amounts = [];
          for(let row of data) {
            drinkers.push(row['drinker']);
            amounts.push(row['spent']);
          }

          this.renderTopSpendersChart(drinkers.slice(0, 10), amounts.slice(0, 10));
        }
      );

      this.barsService.getBarTopBeers(this.barName).subscribe(
        data => {
          const beers = [];
          const counts = [];
          for(let row of data) {
            beers.push(row['item']);
            counts.push(row['count']);
          }

          this.renderTopBeersChart(beers.slice(0, 10), counts.slice(0, 10));
        }
      );

      this.barsService.getBarTopManufacturers(this.barName).subscribe(
        data => {
          const manfs = [];
          const counts = [];
          for(let row of data) {
            manfs.push(row['manufacturer']);
            counts.push(row['count']);
          }

          this.renderTopManufacturersChart(manfs.slice(0, 10), counts.slice(0, 10));
        }
      );

      this.barsService.getBarBusiestTimes(this.barName).subscribe(
        data => {
          const hours = [];
          const counts = [];
          for(let row of data) {
            hours.push(this.barsService.convertTime(row['hour']));
            counts.push(row['count']);
          }

          this.renderBusiestTimesChart(hours, counts);
        }
      );

      this.barsService.getBarBusiestDays(this.barName).subscribe(
        data => {
          const days = [];
          const counts = [];
          for(let row of data) {
            days.push(row['date']);
            counts.push(row['count']);
          }

          this.renderBusiestDaysChart(days, counts);
        }
      );

      this.barsService.getBarSells(this.barName)
      .pipe(finalize(() => {
          this.itemcounts = new Array();
          for(let item of this.sells) {
            this.itemcounts.push(0)
          }
      }))
      .subscribe(
        data => {
          this.sells = data;
        }
      );

      this.barsService.getBarPotentialDrinkers(this.barName).subscribe(
        data => {
          this.potentialdrinkers = data;
        }
      );

    }


  ngOnInit() {
  }

  totalCharge() {
    let totalCharge = 0;
    if(this.sells) {
      this.sells.forEach((item, index) => {
        totalCharge += item.price * this.itemcounts[index];
      });
    }
    return totalCharge;
  }

  isTimeValid() {
    return (this.selectedDate.getHours() >= this.openInt && this.selectedDate.getHours() < this.closeInt)
  }

  addTransaction() {
    let transactionId = uuid();

    let containsInsert = "INSERT INTO contains(transactionid, item, quantity) VALUES ";
    this.sells.forEach((item, index) => {
      if (this.itemcounts[index] !== 0) {
        containsInsert = containsInsert + "(\"" + transactionId + "\",\"" + item.item + "\"," + this.itemcounts[index] + "),";
      }
    });
    containsInsert = containsInsert.slice(0, -1);
    console.log(containsInsert);

    let billsInsert = "INSERT INTO bills(transactionid, totalCharge, tip) VALUES " + "(\""
    + transactionId + "\"," + this.totalCharge() + "," + (this.selectedTip['value'] * this.totalCharge()) + ")";
    console.log(billsInsert)

    let selectedDate = this.selectedDate;
    let selectedDateString = selectedDate.getMonth() + "/" + selectedDate.getDate() + "/" + selectedDate.getFullYear()
    let issuedInsert = "INSERT INTO issued(transactionid, issuedto, issuedby, date, hour, minute) VALUES " + "(\""
    + transactionId + "\",\"" + this.selectedDrinker['name'] + "\",\"" + this.barName + "\",\"" + selectedDateString + "\","
    + selectedDate.getHours() + "," + selectedDate.getMinutes() + ")"

    console.log(issuedInsert)

    this.modificationService.getModificationResults(issuedInsert).subscribe(
      data => {
        let rowsMatched = data['rows'];
        console.log(rowsMatched + " rows changed")
      },
      (error: HttpResponse<any>) => {
        console.log(error['error']);
      },
      () => {
        this.modificationService.getModificationResults(billsInsert).subscribe(
          data => {
            let rowsMatched = data['rows'];
            console.log(rowsMatched + " rows changed")
          },
          (error: HttpResponse<any>) => {
            console.log(error['error']);
          },
          () => {
            this.modificationService.getModificationResults(containsInsert).subscribe(
              data => {
                let rowsMatched = data['rows'];
                console.log(rowsMatched + " rows changed")
              },
              (error: HttpResponse<any>) => {
                console.log(error['error']);
              }
            );
          }
        );
      }
    );

    this.selectedDrinker = null;
    for (let count of this.itemcounts) {
      count = 0;
    }
    this.selectedTip = null;
    this.selectedDate = null;
  }

  renderTopSpendersChart(drinkers: string[], amounts: number[]) {
    Highcharts.chart("topspenderschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Top Spenders At " + this.barName)
      },
      xAxis: {
        categories: drinkers,
        title: {
          text: "Drinker"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Amount spent"
        },
        labels: {
          overflow: "justify"
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'spent',
        data: amounts
      }]
    });
  }

  renderTopBeersChart(beers: string[], counts: number[]) {
    Highcharts.chart("topbeerschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Top Beers At " + this.barName)
      },
      xAxis: {
        categories: beers,
        title: {
          text: "Beer"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of times bought"
        },
        labels: {
          overflow: "justify"
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'count',
        data: counts
      }]
    });
  }

  renderTopManufacturersChart(manfs: string[], counts: number[]) {
    Highcharts.chart("topmanfschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Highest Selling Manufacturers At " + this.barName)
      },
      xAxis: {
        categories: manfs,
        title: {
          text: "Manufacturer"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of times bought"
        },
        labels: {
          overflow: "justify"
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'count',
        data: counts
      }]
    });
  }

  renderBusiestTimesChart(hours: string[], counts: number[]) {
    Highcharts.chart("busiesttimeschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Popular Times At " + this.barName)
      },
      xAxis: {
        categories: hours,
        title: {
          text: "Hour"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of transactions"
        },
        labels: {
          overflow: "justify"
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'count',
        data: counts
      }]
    });
  }

  renderBusiestDaysChart(days: string[], counts: number[]) {
    Highcharts.chart("busiestdayschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Popular Days At " + this.barName)
      },
      xAxis: {
        categories: days,
        title: {
          text: "Day"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of transactions"
        },
        labels: {
          overflow: "justify"
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'count',
        data: counts
      }]
    });
  }
}
