import { Component, OnInit } from '@angular/core';

import { CollectionService } from '../services/collection.service';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  private collection;
  constructor(private collectionService:CollectionService) { }

  ngOnInit() {
    this.collectionService.getCollection().subscribe(data => {
      console.log(111, data);
      this.collection = data.item;
    },
      error => {
        console.log(error);
      });
  }

}
