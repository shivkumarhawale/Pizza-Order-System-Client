import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';

const routes: Routes = [{
  path :'',
  component: CreatePizzaComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
