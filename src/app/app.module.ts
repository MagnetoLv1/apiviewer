import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxElectronModule} from 'ngx-electron';


import { UiModule } from './ui/ui.module';
import { AppComponent } from './app.component';
import { CollectionService } from './services/collection.service';
import { SendService } from './services/send.service';
import { CollectionComponent } from './collection/collection.component';
import { ItemComponent } from './collection/item/item.component';
import { RequestComponent } from './request/request.component';
import { ResponseComponent } from './response/response.component';
import { FormdataComponent } from './request/formdata/formdata.component';
import { UrlencodedComponent } from './request/urlencoded/urlencoded.component';
// Pleas note the module is no in the root

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    ItemComponent,
    RequestComponent,
    ResponseComponent,
    FormdataComponent,
    UrlencodedComponent
  ],
  imports: [
    BrowserModule,
    HttpModule ,
    FormsModule,
    SplitPaneModule,
    NgxElectronModule,
    NgbModule.forRoot(),
    UiModule
  ],
  providers: [CollectionService, SendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
