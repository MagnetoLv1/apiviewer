import { Component, OnInit, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { Broadcaster } from 'ng2-broadcast';

@Component({
  selector: 'collection-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Input() level: number;

  mouseover: boolean = false;
  open: boolean = false;
  @HostListener('mouseover')
  onMouseOver() {
    this.mouseover = true;
  }

  @Output() outEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @HostListener('mouseout')
  onMouseOut() {
    this.mouseover = false;
  }

  constructor(private broadcaster: Broadcaster) { }

  ngOnInit() {
  }


  onItemClick($event) {
    console.log(this.isFolder())
    if (this.isFolder()) {
      this.open = !this.open
    }
    else {
      this.broadcaster.broadcast('item',this.item);
    }
      $event.stopPropagation(); //이벤트가 부모로 올라가지 못하게
  }


  get folderClass(): string {
    return this.open ? 'ico_open' : 'ico_close';
  }

  get itemClass(): string {
    return this.isFolder() ? this.folderClass : 'ico_docu';
  }


  get subItem(): Array<Object> {
    return this.item.item ? this.item.item : [];
  }

  get pointClass(): string {
    return this.open ? 'roots_open' : 'roots_close'
  }

  get nodeClass(): string {
    return this.isFolder() ? this.pointClass : 'center_docu';
  }


  isFolder(): boolean {
    return this.item.request ? false : true;
  }
}
