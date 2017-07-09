import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private nativeRequestService: NativeRequestService) {
  }

  get formdata(): any {
    if (!this.requestData.body) return [];
    return this.requestData.body.formdata || [];
  }

  ngOnInit() {
  }

  onSend() {

    console.log(this.requestData);

    let request = new Request(this.requestData.url, {
      method: this.requestData.method,
      headers: this.requestData.headers,
      body: '',
      mode: 'no-cors',  // "same-origin" | "no-cors" | "cors"
      credentials: 'same-origin',   //"omit" | "same-origin" | "include"
      cache: 'default'     //"default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached"
    }); 

    this.nativeRequestService.request(request).subscribe(response => {
      console.log('subscribe', response, response.text().then(data => console.log(data)));
    },
      error => {
        console.log(error);
      });
  }
  onSave() {
  }
}
