import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// Pleas note the module is no in the root
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplitPaneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
