import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent} from './modules/sign-in/sign-in.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { RequestTurnComponent } from './modules/request-turn/request-turn.component';
import { TurnComponent } from './modules/turn/turn.component';



const routes: Routes = [
  { path: '',component: SignInComponent },
  { path: 'sign-up',component: SignUpComponent },
  { path: 'request-turn', component: RequestTurnComponent},
  { path: 'turn', component: TurnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
