import { Component, OnInit, Input, Directive, QueryList, ContentChildren, ElementRef, ViewContainerRef } from '@angular/core';

import { PanelComponent } from '../panel/panel.component';

@Directive({
  selector: 'ui-tabbar-title'
})
export class UiTitleDirective {
  constructor(public el: ElementRef) {
  }
}



@Component({
  selector: 'ui-tabbar-item',
  templateUrl: './tabitem.component.html',
  styleUrls: ['./tabitem.component.css']
})
export class TabitemComponent implements OnInit {
  @ContentChildren(PanelComponent) panelComponent: QueryList<PanelComponent>
  @ContentChildren(UiTitleDirective) titleDirective: QueryList<UiTitleDirective>


  constructor(protected viewContainer: ViewContainerRef) { }

  ngOnInit() {
  }

  get title() {
    console.log(this.titleDirective.first,this.panelComponent.first,  this.viewContainer)
    return 11;//this.titleDirective.first.el.nativeElement.innerHTML;
  }
}
