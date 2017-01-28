import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { trace, Category, UIRouterModule, UIView } from "ui-router-ng2";

import { APP_STATES, DEFAULT_STATE } from "./app.states";
import { AppComponent } from './app.component';

trace.enable(Category.TRANSITION, Category.VIEWCONFIG);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UIRouterModule.forRoot({
      states: APP_STATES,
      otherwise: DEFAULT_STATE,
      useHash: true
    })
  ],
  providers: [],
  bootstrap: [UIView]
})
export class AppModule { }
