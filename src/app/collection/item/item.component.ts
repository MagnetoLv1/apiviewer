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
  @Input() path: string;

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
    this.open = this.openState;
  }


  onItemClick($event) {
    console.log(this.isFolder(), this.path)
    if (this.isFolder()) {
      this.open = !this.open
      this.openState = this.open;
    }
    else {
      this.item.path = this.path;
      this.broadcaster.broadcast('item', this.item);
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

  /**
   * 열려있었는지 상태값
   */
  private get openState(): boolean {
    return localStorage.getItem(this.path) == 'true';
  }
  private set openState(state: boolean) {
    localStorage.setItem(this.path, state.toString());
  }
}
