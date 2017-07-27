import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NativeRequestService } from "app/services/native-request.service";
import { NgbTabsetConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() request: any;

  @Output() responseChange = new EventEmitter<Response>();
  @Output() saveEvent = new EventEmitter<String>();



  constructor(private nativeRequestService: NativeRequestService) {
  }

  get urlencoded(): any {
    return this.request.body.urlencoded;
  }
  get raw(): any {
    return this.request.body.raw;
  }

  get formdata(): any {
    return this.request.body.formdata;
  }

  ngOnInit() {
  }
  get method() {
    return this.request.method ? this.request.method : 'GET';
  }
  set method(val) {
    this.request.method = val;
  }

  get mode() {
    return this.request.body ? this.request.body.mode : 'form-data';
  }

  set mode(value:string) {
     this.request.body.mode = value;
  }

  get header() {
    return this.request.header; 
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
    this.saveEvent.emit('save');
  }
}
