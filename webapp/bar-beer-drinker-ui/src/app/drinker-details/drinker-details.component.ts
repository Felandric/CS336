import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkersService, Drinker, Bill } from '../drinkers.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;

@Component({
  selector: 'app-drinker-details',
  templateUrl: './drinker-details.component.html',
  styleUrls: ['./drinker-details.component.css']
})
export class DrinkerDetailsComponent implements OnInit {

  bills: Bill[];
  drinker: Drinker;
  drinkerName: string;

  constructor(
    public drinkersService: DrinkersService,
    public route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.drinkerName = paramMap.get('drinker');
    });

    this.drinkersService.getDrinkerTransactions(this.drinkerName).subscribe(
      data => {
        this.bills = data;
        for (let bill of this.bills) {
          bill.hour = this.drinkersService.convertTime(bill.hour, bill.minute);
        }
      },
      (error: HttpResponse<any>) => {
        if (error.status === 404) {
          alert("Drinker not found")
        } else {
          console.error(error.status + " - " + error.body);
          alert("An error occurred on the server. Please check the console.")
        }
      }
    );

    this.drinkersService.getDrinkerDetails(this.drinkerName).subscribe(
      data => {
        this.drinker = data;
        }
    );

    this.drinkersService.getDrinkerFavoriteBeers(this.drinkerName).subscribe(
      data => {
        const beers = [];
        const counts = [];
        for(let row of data) {
          beers.push(row['item']);
          counts.push(row['count']);
        }

        this.renderFavoriteBeersChart(beers.slice(0, 10), counts.slice(0, 10));
      }
    );

    this.drinkersService.getDrinkerBusiestTimes(this.drinkerName).subscribe(
      data => {
        const hours = [];
        const counts = [];
        for(let row of data) {
          hours.push(this.drinkersService.convertTime(row['hour'], "0"));
          counts.push(row['count']);
        }

        this.renderBusiestTimesChart(hours, counts);
      }
    );

    this.drinkersService.getDrinkerBusiestDays(this.drinkerName).subscribe(
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

    this.drinkersService.getDrinkerBusiestMonths(this.drinkerName).subscribe(
      data => {
        const months = [];
        const counts = [];
        for(let row of data) {
          months.push(row['date']);
          counts.push(row['count']);
        }

        this.renderBusiestMonthsChart(months, counts);
      }
    );
  }

  ngOnInit() {
  }

  renderFavoriteBeersChart(beers: string[], counts: number[]) {
    Highcharts.chart("favoritebeerschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Most Ordered Beers by " + this.drinkerName)
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
          text: "Number of times ordered"
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
        text: ("Times Of Day When " + this.drinkerName + " Is Drinking")
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
        text: ("Weekdays When " + this.drinkerName + " Is Drinking")
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

  renderBusiestMonthsChart(months: string[], counts: number[]) {
    Highcharts.chart("busiestmonthschart", {
      chart: {
        type: "column"
      },
      title: {
        text: ("Months When " + this.drinkerName + " Is Drinking")
      },
      xAxis: {
        categories: months,
        title: {
          text: "Month"
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
