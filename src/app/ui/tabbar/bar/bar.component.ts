import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';


import { TabitemComponent } from '../tabitem/tabitem.component';

@Component({
  selector: 'ui-tabbar-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @ContentChildren(TabitemComponent) items: QueryList<TabitemComponent>

  constructor() { }

  ngOnInit() {
    console.log(111,this.items);
  }


}
