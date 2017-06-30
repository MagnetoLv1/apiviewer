import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  mode: string = 'formdata';
  @Input() requestData: any;

  constructor() { }

  get formdata():any{
    if(!this.requestData.body) return [];
      return this.requestData.body.formdata || [];
  }

  ngOnInit() {
    console.log(this.requestData);
  }

}
