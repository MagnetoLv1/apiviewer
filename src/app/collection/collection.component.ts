import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CollectionService } from '../services/collection.service';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  private collection:any;
  private selectItem:Object;

  constructor(private collectionService:CollectionService) { }

  ngOnInit() {
    this.collectionService.getCollection().subscribe(data => {
      
      this.collection = data;
      var ddd = {ddd:33434};
      console.log('11111111111111111,',typeof this.collection.item, ddd.ddd);
    },
      error => {
        console.log(error);
      });
  }

  get item():Array<Object>{
    return this.collection?this.collection.item:[];
  }

  
  onItemClick($event) {
    console.log(event)
  }

}
