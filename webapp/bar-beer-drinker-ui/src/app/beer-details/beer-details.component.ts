import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeersService, Beer } from '../beers.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  beerName: string;
  beerDetails: Beer;

  constructor(
    public beersService: BeersService,
    public route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.beerName = paramMap.get('beer');
    })

    this.beersService.getBeerDetails(this.beerName).subscribe(
        data => {
          this.beerDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert("Beer not found")
          } else {
            console.error(error.status + " - " + error.body);
            alert("An error occurred on the server. Please check the console.")
          }
        }
      );

      this.beersService.getBeerTopBars(this.beerName).subscribe(
        data => {
          const bars = [];
          const counts = [];
          for(let row of data) {
            bars.push(row['bar']);
            counts.push(row['count']);
          }

          this.renderTopBarsChart(bars.slice(0, 10), counts.slice(0, 10));
        }
      );

      this.beersService.getBeerTopDrinkers(this.beerName).subscribe(
        data => {
          const drinkers = [];
          const counts = [];
          for(let row of data) {
            drinkers.push(row['drinker']);
            counts.push(row['count']);
          }

          this.renderTopDrinkersChart(drinkers.slice(0, 10), counts.slice(0, 10));
        }
      );

      this.beersService.getBeerBusiestTimes(this.beerName).subscribe(
        data => {
          const hours = [];
          const counts = [];
          for(let row of data) {
            hours.push(this.beersService.convertTime(row['hour']));
            counts.push(row['count']);
          }

          this.renderBusiestTimesChart(hours, counts);
        }
      );

      this.beersService.getBeerBusiestDays(this.beerName).subscribe(
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

  renderTopBarsChart(bars: string[], counts: number[]) {
    Highcharts.chart("topbarschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Top Bars Selling " + this.beerName)
      },
      xAxis: {
        categories: bars,
        title: {
          text: "Bar"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of times sold"
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

  renderTopDrinkersChart(drinkers: string[], counts: number[]) {
    Highcharts.chart("topdrinkerschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Top Drinkers Buying " + this.beerName)
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
        text: ("Times When People Buy " + this.beerName)
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

  renderBusiestDaysChart(days: string[], counts: number[]) {
    Highcharts.chart("busiestdayschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Days When People Buy " + this.beerName)
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

}
