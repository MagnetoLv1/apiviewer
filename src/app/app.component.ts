import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  requestData:any = {a:1213};
  constructor() {


  }

  ngOnInit() {
  }

  onSelectItem(requestData:Object){
    console.log(requestData);
    this.requestData = requestData;
  }
}
