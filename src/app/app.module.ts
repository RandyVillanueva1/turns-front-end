import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigInComponent } from './modules/sign-in/sign-in.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { RequestTurnComponent } from './modules/request-turn/request-turn.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SigInComponent,
    SignUpComponent,
    RequestTurnComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
