import { Component, OnInit, Input } from '@angular/core';
import { Broadcaster } from "ng2-broadcast";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  response: Response = new Response();
  title = 'app';
  request: any = { a: 1213 };
  constructor(private broadcaster: Broadcaster) {

    /**
     * 아이템을 선택했을 경우
     */
    this.broadcaster.on<string>('item')
      .subscribe((item:any) => {
        console.log(item);
        this.request = item.request;
      });

  }

  ngOnInit() {
  }

  onResponseChange(response: Response) {
    this.response = response;
  }
}
