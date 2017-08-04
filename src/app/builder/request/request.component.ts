import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NativeRequestService } from "app/services/native-request.service";
import { NgbTabsetConfig } from "@ng-bootstrap/ng-bootstrap";
import { IRequest, IResponse } from "app/builder/request/interface/item";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() request: IRequest;

  @Output() responseChange = new EventEmitter<IResponse>();
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
    return this.request.body.mode;
  }

  set mode(value: string) {
    this.request.body.mode = value;
  }

  get header() {
    return this.request.header;
  }

  onSend() {
    this.nativeRequestService.request(this.request).then(response => {
      //header
      //response.headers.forEach(function (val, key) { console.log(key + ' -------> ' + val); });
      //response.text().then(data => console.log('----------->',data)); 
      console.log('nativeRequestService ---', response)
      this.responseChange.emit(response);
    }, error => {
      console.log(error)
    });
  }


  onSave() {
    this.saveEvent.emit('save');
  }
}
