import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar } from '../bars.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;

  constructor(
    public barsService: BarsService,
    public route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');
    })

    this.barsService.getBarDetails(this.barName).subscribe(
        data => {
          this.barDetails = data;
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

          this.renderTopSpendersChart(drinkers, amounts);
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

          this.renderTopBeersChart(beers, counts);
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

          this.renderTopManufacturersChart(manfs, counts);
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
    }


  ngOnInit() {
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
