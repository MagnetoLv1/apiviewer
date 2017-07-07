import { Injectable } from '@angular/core';
import { RequestOptionsArgs } from "@angular/http/src";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ElectronService } from 'ngx-electron';

@Injectable()
export class NativeRequestService {

  _ipcRenderer: Electron.IpcRenderer;
  _response: Response;
  _behaviorSubject: Subject<Response>;

  constructor(private _electronService: ElectronService) {
    this._behaviorSubject = new Subject<Response>();
    this._ipcRenderer = _electronService.ipcRenderer;
  }


  /**
   * 
   * @param url 
   * @param options 
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    console.log('request');
    this._ipcRenderer.on('remote.response-start', (event, statusCode, statusMessage, headers) => {
      console.log(statusCode, statusMessage, headers) // prints "pong"
    })
    this._ipcRenderer.on('remote.response-body', (event, arg) => {
      //  console.log(arg) // prints "pong"
    })
    this._ipcRenderer.on('remote.response-complete', (event, arg) => {
      //console.log(arg) // prints "pong" 
    })
    this._ipcRenderer.on('remote.request-finish', (event) => {
      //console.log(arg) // prints "pong" 
    })
    this._ipcRenderer.on('remote.request-abort', (event) => {
      //console.log(arg) // prints "pong" 
    })
    this._ipcRenderer.on('remote.request-error', (event, error) => {
      console.log('remote.request-error',error, error.toString()) // prints "pong" 
    })
    this._ipcRenderer.sendSync('native.request', 'http://m.kakao.com', options);

    return this._behaviorSubject.asObservable();
  }
}
