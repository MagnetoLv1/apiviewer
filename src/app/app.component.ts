import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  response: Response = new Response();
  title = 'app';
  requestData: any = { a: 1213 };
  constructor() {


  }

  ngOnInit() {
  }

  onSelectItem(requestData: Object) {
    this.requestData = requestData;
  }

  onResponseChange(response: Response) {
    this.response = response;
  }
}
