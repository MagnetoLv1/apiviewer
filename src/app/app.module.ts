import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
// Pleas note the module is no in the root

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SplitPaneModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
