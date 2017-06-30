import { Component, OnInit, HostListener, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'collection-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: any;

  mouseover: boolean = false;

  @HostListener('mouseover')
  onMouseOver() {
    this.mouseover = true;
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.mouseover = false;
  }

  constructor() { }

  ngOnInit() {
  }

  onItemClick() {
  }
}
