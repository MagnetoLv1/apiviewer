import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'request-formdata',
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css']
})
export class FormdataComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
