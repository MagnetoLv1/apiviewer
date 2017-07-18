import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FilesystemService } from '../../../services/filesystem.service';
import * as Electron from 'electron';
import * as fs from 'fs';
@Component({
  selector: 'response-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  @Input() body: string ='';
  reader: FileReader;
  _format: string;

  bodyJson: string;
  constructor(private filesystemService: FilesystemService) {
  }

  ngOnInit() {
  }

  set format(val: string) {
    this._format = val;

    switch (this._format) {
      case 'putty':
        this.bodyToJson();
        break;
      case 'raw':
        break;
      case 'privew':
        this.bodyToWebview();
        break;
    }
  }
  get format(): string {
    return this._format;
  }


  /**
   * https://github.com/matiboy/angular2-prettyjson
   */
  private _jsonBody: string;
  protected bodyToJson() {
    if (this._jsonBody == this.body) {
      return;
    }
    this._jsonBody == this.body;

    try {
      this.bodyJson = JSON.parse(this.body);
    } catch (error) {
      this.bodyJson = this.body;
    }
  }

  private _previewBody: string;
  protected bodyToWebview() {
    if (this._previewBody == this.body) {
      return;
    }
    this._previewBody == this.body;
    this.filesystemService.writeFile('./preview.html', this.body, () => {
      console.log('writed');
      let path = this.filesystemService.realpathSync('./preview.html');
      const webview:any= document.getElementById('webview');
      webview.loadURL(path);
    })
  }
}