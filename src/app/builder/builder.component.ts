import { Component, OnInit } from '@angular/core';
import { Broadcaster } from "ng2-broadcast";
import { CollectionService } from "app/services/collection.service";
import { Item, Keyvalue } from "./request/interface/item";


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  item: any;
  copyItem: Item = <Item> {
    path: '',
    request: {
      url: '',
      mothod: 'GET',
      body: {
        formdata: [],
        urlencoded: [],
      },
      header: []
    },
    response: {

    }
  };
  constructor(private broadcaster: Broadcaster, private collectionService: CollectionService) {
    /**
    * 아이템을 선택했을 경우
    */
    this.broadcaster.on<string>('item')
      .subscribe((item: any) => {
        // this.item = item;
        this.copyItem = JSON.parse(JSON.stringify(item));
        if (!this.copyItem.request.header) {
          this.copyItem.request.header = new Array<Keyvalue>();
        }
        this.copyItem.request.header.push({
          key: '',
          value: '',
          description: ''
        });
        if (!this.copyItem.request.body.formdata) {
          this.copyItem.request.body.formdata = new Array<Keyvalue>();
        }
        this.copyItem.request.body.formdata.push({
          key: '',
          value: '',
          description: '',
          type: 'text'
        });
        if (!this.copyItem.request.body.urlencoded) {
          this.copyItem.request.body.urlencoded = new Array<Keyvalue>();
        }
        this.copyItem.request.body.urlencoded.push({
          key: '',
          value: '',
          description: ''
        });
      });
  }

  ngOnInit() {
  }

  onResponseChange(response: Response) {
    this.item.response = response;
  }

  onSaveEvent() {
    let item = JSON.parse(JSON.stringify(this.copyItem));
    this.cleanData(item);
    this.collectionService.update(item.path, item)
  }


  cleanData(data: Item) {
    this.emptyDataRemove(data.request.body.urlencoded);
    this.emptyDataRemove(data.request.body.formdata);
    this.emptyDataRemove(data.request.header);
  }

  emptyDataRemove(data: any) {
    console.log(data);
    let cnt = data.length;
    for (let i = cnt - 1; i >= 0; i--) {
      if (this.isEmptyData(data[i])) {
        data.splice(i, 1);
      }
    }
  }


  isEmptyData(data: any) {
    if (!data.key && !data.value) {
      return true;
    }
    return false;
  }
}
