import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';
import { QueryInterfaceComponent } from './query-interface/query-interface.component';
import { DrinkersComponent } from './drinkers/drinkers.component';
import { BeersComponent } from './beers/beers.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { ModificationComponent } from './modification/modification.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {SpinnerModule} from 'primeng/spinner';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BarDetailsComponent,
    DrinkerDetailsComponent,
    QueryInterfaceComponent,
    DrinkersComponent,
    BeersComponent,
    BeerDetailsComponent,
    ModificationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    InputTextareaModule,
    ButtonModule,
    ProgressSpinnerModule,
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    SpinnerModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
