import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SendService } from "app/services/send.service";
import { NativeRequestService } from "app/services/native-request.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  mode: string = 'formdata';
  @Input() requestData: any;
  @Output() responseChange = new EventEmitter<Response>();
  @Output() testChange = new EventEmitter<string>();



  constructor(private nativeRequestService: NativeRequestService) {
  }

  get formdata(): any {
    if (!this.requestData.body) return [];
    return this.requestData.body.formdata || [];
  }

  ngOnInit() {
  }

  onSend() {

    let request = new Request(this.requestData.url, {
      method: this.requestData.method,
      headers: this.requestData.headers,
      body: '',
      mode: 'no-cors',  // "same-origin" | "no-cors" | "cors"
      credentials: 'same-origin',   //"omit" | "same-origin" | "include"
      cache: 'default'     //"default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached"
    });
    this.testChange.emit('aaaaaaaaa');
this.responseChange.emit(new Response());
    this.nativeRequestService.request(request).subscribe(response => {
      //header
      //response.headers.forEach(function (val, key) { console.log(key + ' -> ' + val); });
      //response.text().then(data => console.log(data)); 

this.responseChange.emit(new Response());
      this.testChange.emit('ddddddddd');
    },
      error => {
        console.log(error);
      });
  }
  onSave() {
  }
}
