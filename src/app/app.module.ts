import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, UrlSerializer } from '@angular/router';
import { NgxElectronModule } from 'ngx-electron';
import { Broadcaster } from 'ng2-broadcast';
import { AngularSplitModule } from 'angular-split'; //화면 slipt         
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { PrettyJsonModule, SafeJsonPipe } from 'angular2-prettyjson';   //Json Prtty 

import { AppComponent } from './app.component';
import { CollectionService } from './services/collection.service';
import { FilesystemService } from './services/filesystem.service';
import { SendService } from './services/send.service';
import { NativeRequestService } from "app/services/native-request.service";
import { CollectionComponent } from './collection/collection.component';
import { ItemComponent } from './collection/item/item.component';
import { RequestComponent } from './builder/request/request.component';
import { ResponseComponent } from './builder/response/response.component';
import { FormdataComponent } from './builder/request/formdata/formdata.component';
import { UrlencodedComponent } from './builder/request/urlencoded/urlencoded.component';
import { JsonPipe } from '@angular/common';
import { BodyComponent } from './builder/response/body/body.component';
import { WebviewDirective } from './directive/webview.directive';
import { GroupComponent } from './collection/group/group.component';
import { BuilderComponent } from './builder/builder.component';
import { EditComponent } from './collection/edit/edit.component';
// Pleas note the module is no in the root

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    ItemComponent,
    RequestComponent,
    ResponseComponent,
    FormdataComponent,
    UrlencodedComponent,
    BodyComponent,
    WebviewDirective,
    GroupComponent,
    BuilderComponent,
    EditComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    NgxElectronModule,
    NgbModule.forRoot(),
    PrettyJsonModule,
    AngularSplitModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [CollectionService, SendService, NativeRequestService, FilesystemService, JsonPipe, SafeJsonPipe, Broadcaster],
  bootstrap: [AppComponent],
  entryComponents: [EditComponent]
})
export class AppModule { }
