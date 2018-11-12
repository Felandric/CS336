import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';

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
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
