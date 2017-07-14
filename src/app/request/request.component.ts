import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SendService } from "app/services/send.service";
import { NativeRequestService } from "app/services/native-request.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() request: any;
  @Output() responseChange = new EventEmitter<Response>();



  constructor(private nativeRequestService: NativeRequestService, private sendService: SendService) {
  }

  get formdata(): any {
    if (!this.request.body) return [];
    return this.request.body.formdata || [];
  }

  ngOnInit() {
  }
  get method() {
    return this.request.method  ? this.request.method : 'GET';
  }

  get mode() {
    return this.request.body ? this.request.body.mode : 'form-data';
  }

  onSend() {
    console.log(this.request);
    let req = new Request(this.request.url, {
      method: this.request.method,
      headers: this.request.headers,
      body: {},
      mode: 'no-cors',  // "same-origin" | "no-cors" | "cors"
      credentials: 'same-origin',   //"omit" | "same-origin" | "include"
      cache: 'default'     //"default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached"
    });

    this.nativeRequestService.request(req).then(response => {
      //header
      //response.headers.forEach(function (val, key) { console.log(key + ' -------> ' + val); });
      //response.text().then(data => console.log('----------->',data)); 
      this.responseChange.emit(response);
    }, error => {
      console.log(error)
    });
  }
  onSave() {
  }
}
