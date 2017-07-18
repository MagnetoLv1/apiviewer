import { Component, OnInit } from '@angular/core';
import { Broadcaster } from "ng2-broadcast";
import { CollectionService } from "app/services/collection.service";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  item: any = {
    request: {

    },
    response: {

    }
  };
  constructor(private broadcaster: Broadcaster, private collectionService: CollectionService) {    /**
     * 아이템을 선택했을 경우
     */
    this.broadcaster.on<string>('item')
      .subscribe((item: any) => {
        this.item = item;
      });
  }

  ngOnInit() {
  }

  onResponseChange(response: Response) {
    this.item.response = response;
  }

  onSaveEvent() {
    this.collectionService.saveItem(this.item.path, this.item)
  }
}
