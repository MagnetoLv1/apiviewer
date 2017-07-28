import { Component, OnInit } from '@angular/core';
import { Broadcaster } from "ng2-broadcast";
import { CollectionService } from "app/services/collection.service";
import { IItem, IKeyvalue, IResponse } from "./request/interface/item";


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
        this.copyItem = JSON.parse(JSON.stringify(item));

        //추가 입력폼을 위한
        this.addBlankInput(this.copyItem.request.header);
        this.addBlankInput(this.copyItem.request.body.formdata);
        this.addBlankInput(this.copyItem.request.body.urlencoded);
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
  addBlankInput(values: Array<IKeyvalue>) {
    if (!values) {
      values = new Array<IKeyvalue>();
    }
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
    this.emptyDataRemove(data.request.body.urlencoded);
    this.emptyDataRemove(data.request.body.formdata);
    this.emptyDataRemove(data.request.header);
  }

  emptyDataRemove(values: Array<IKeyvalue>) {
    let cnt = values.length;
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
}
