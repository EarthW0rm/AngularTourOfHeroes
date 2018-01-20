import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, HeroesComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
