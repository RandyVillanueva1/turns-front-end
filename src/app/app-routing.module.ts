import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigInComponent} from './modules/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'sig-in',
    component: SigInComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
