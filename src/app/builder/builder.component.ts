import { Component, OnInit } from '@angular/core';
import { Broadcaster } from "ng2-broadcast";
import { CollectionService } from "app/services/collection.service";
import { IItem, IKeyvalue, IResponse, IBody } from "./request/interface/item";


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  item: any;
  copyItem: IItem = <IItem>{
    path: '',
    request: {
      url: '',
      method: 'GET',
      body: {
        formdata: [],
        urlencoded: [],
      },
      header: []
    },
    response: {
      status: 0,
      statusText: '',
      headers: [],
      body: ''
    }
  };
  response: IResponse = <IResponse>{
    status: 0,
    statusText: '',
    headers: [],
    body: ''
  };
  constructor(private broadcaster: Broadcaster, private collectionService: CollectionService) {

    /**
    * 아이템을 선택했을 경우
    */
    this.broadcaster.on<string>('item')
      .subscribe((item: any) => {
        // this.item = item;
        let obj = JSON.parse(JSON.stringify(item));

        console.log(this.copyItem);
        this.copyItem = this.MergeRecursive(this.copyItem, obj);
        //추가 입력폼을 위한
        console.log(this.copyItem)
        if (!this.copyItem.request.body) {
          //this.copyItem.request['body']= <IBody>{}
        }
        this.addBlankInput(this.copyItem.request, 'header');
        this.addBlankInput(this.copyItem.request.body, 'formdata');
        this.addBlankInput(this.copyItem.request.body, 'urlencoded');
        console.log(this.copyItem.request.body);
      });
  }

  ngOnInit() {
  }


  onResponseChange(response: IResponse) {
    this.response = response;
  }

  onSaveEvent() {
    let item = JSON.parse(JSON.stringify(this.copyItem));
    this.cleanData(item);
    this.collectionService.update(item.path, item)
  }

  /**
   * 추가입력폼을 위한 빈값 추가
   * @param values 
   * 
   */
  addBlankInput(parent: any, key: string) {
    if (!parent[key]) {
      parent[key] = new Array<IKeyvalue>();
    }
    let values = parent[key];
    values.push(<IKeyvalue>{
      key: '',
      value: '',
      description: ''
    });
  }


  /**
   * 비어있는 값 제거
   * @param data 
   */
  cleanData(data: IItem) {
    console.log(data.request.body)
    this.emptyDataRemove(data.request.body,'urlencoded');
    this.emptyDataRemove(data.request.body,'formdata');
    this.emptyDataRemove(data.request,'header');
  }

  emptyDataRemove(parent: any , key:string) {
    if (!parent[key]) {
      return;
    }
    let values:Array<IKeyvalue> = parent[key];
    let cnt = values.length;
    if(cnt ==0){
      delete parent[key];
      return;
    }
    for (let i = cnt - 1; i >= 0; i--) {
      if (this.isEmptyData(values[i])) {
        values.splice(i, 1);
      }
    }
  }

  isEmptyData(data: IKeyvalue) {
    if (!data.key && !data.value) {
      return true;
    }
    return false;
  }

  MergeRecursive(obj1, obj2) {

    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj2[p].constructor == Object) {
          obj1[p] = this.MergeRecursive(obj1[p], obj2[p]);

        } else {
          obj1[p] = obj2[p];

        }

      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];

      }
    }

    return obj1;
  }
}
