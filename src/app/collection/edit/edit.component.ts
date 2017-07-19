import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class RequestModalContext extends BSModalContext {
  public path: number;
  public item: any;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  context: RequestModalContext;

  constructor(public dialog: DialogRef<RequestModalContext>) {
    this.context = this.dialog.context;
  }
  ngOnInit() {
  }

  onClose() {
    this.dialog
    this.dialog.close();
  }
}
