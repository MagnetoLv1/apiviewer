import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  header:Object = new Object();
  response: Response = new Response('',{statusText:'test'});
  title = 'app';
  requestData: any = { a: 1213 };
  constructor() {


  }

  ngOnInit() {
  }

  onSelectItem(requestData: Object) {
    console.log(requestData);
    this.requestData = requestData;
  }

  onResponseChange(response: Response) {
     response.headers.forEach(function (val, key) { console.log(key + ' -> ' + val); });
    this.response = response;
    console.log(this.response );
  }

  onTextChange(title: string) {
    this.title = title;
  }

  
  get headers() {
    return this.response.statusText;
  }
}
