import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CollectionService } from '../services/collection.service';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  private collection:Array<Object>;
  private selectItem:Object;
  @Output() outEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private collectionService:CollectionService) { }

  ngOnInit() {
    this.collectionService.getCollection().subscribe(data => {
      this.collection = data.item;
    },
      error => {
        console.log(error);
      });
  }

  onSelectItem(item:any){
    this.selectItem = item;
    this.outEventEmitter.emit(item.request);    
  }
}
