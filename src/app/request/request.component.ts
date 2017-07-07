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
    console.log(this.requestData);
  }

  onSend() {
    this.nativeRequestService.request(this.requestData).subscribe(data => {
      console.log('subscribe', data.text());
    },
      error => {
        console.log(error);
      });
  }
  onSave() {
  }
}
