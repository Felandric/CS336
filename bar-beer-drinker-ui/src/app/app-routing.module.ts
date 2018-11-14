import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';
import { QueryInterfaceComponent } from './query-interface/query-interface.component';

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "bar"
	},
	{
		path: "bar",
		pathMatch: "full",
		component: WelcomeComponent
	},
	{
		path: "bar/:bar",
		pathMatch: "full",
		component: BarDetailsComponent
	},
	{
		path: "drinker/:drinker",
		pathMatch: "full",
		component: DrinkerDetailsComponent
	},
	{
		path: "query",
		pathMatch: "full",
		component: QueryInterfaceComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
