import { Component, OnInit, Input } from '@angular/core';
import { SendService } from "app/services/send.service";

import {ElectronService} from 'ngx-electron';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  mode: string = 'formdata';
  @Input() requestData: any;

  constructor(private sendService:SendService, private _electronService: ElectronService) { }

  get formdata():any{
    if(!this.requestData.body) return [];
      return this.requestData.body.formdata || [];
  }

  ngOnInit() {
    console.log(this.requestData);
  }

  onSend(){
    console.log(this._electronService.remote.net);
    this.sendService.send(this.requestData).subscribe(data => {
      //console.log(data);
    },
      error => {
        console.log(error);
      });
  }
}
