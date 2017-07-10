import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnChanges, OnInit {

  @Input() response: Response = new Response();
  constructor() { }
  hh:string = '';

  ngOnChanges(changes: {}) {
    this.response.headers.forEach((val, key) => {
      console.log('ResponseComponent', key, val)
      this.hh+=val;
    });
    console.log('ngOnChanges',this.response);
  }

  get headers() {
    let aaa = [];
    this.response.headers.forEach((val, key) => {
      aaa[key] = val;
    });
    return aaa.join(',');
  }


  ngOnInit() {
  }

}
