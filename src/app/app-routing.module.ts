import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSubmitComponent } from './form-submit/form-submit.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"Home",component:HomeComponent},
    {path:"Home/Form",component:FormComponent},
    {path:"Home/Grid",component:FormSubmitComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
