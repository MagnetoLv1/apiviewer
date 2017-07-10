import { Injectable, EventEmitter } from '@angular/core';
import { RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ElectronService } from 'ngx-electron';

@Injectable()
export class NativeRequestService {


  _ipcRenderer: Electron.IpcRenderer;
  _subject: Subject<Response>;

  constructor(private _electronService: ElectronService) {
    this._ipcRenderer = _electronService.ipcRenderer;
  }


  /**
   * 
   * @param url 
   * @param options 
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    let subject = new Subject<Response>();
    let responseInit: ResponseInit = null;
    let request: Request;
    let body = '';
    if (typeof url == 'string') {
      request = new Request(url);
    }
    else {
      request = url;
    }


    this._ipcRenderer.on('remote.response-start', (event, statusCode, statusMessage, headers) => {

      console.log(statusCode, statusMessage, headers)
      responseInit = {
        status: statusCode,
        statusText: statusMessage,
        headers: headers
      }
    });
    this._ipcRenderer.on('remote.response-body', (event, chunk) => {
      body += chunk.toString();
    })
    this._ipcRenderer.on('remote.response-complete', (event) => {
      //console.log('remote.response-complete')

      let response = new Response(body, responseInit);
      subject.next(response);
      subject.complete();
    })
    this._ipcRenderer.on('remote.request-finish', (event) => {
      //console.log(arg) // prints "pong" 
    })
    this._ipcRenderer.on('remote.request-abort', (event) => {
      //console.log(arg) // prints "pong" 
    })
    this._ipcRenderer.on('remote.request-error', (event, error) => {
      console.log('remote.request-error', error, error.toString())

      subject.error(error);
    })

    this._ipcRenderer.sendSync('native.request', {
      url: request.url,
      method: request.method,
      headers: request.headers,
      body: '',
      mode: request.mode,
      credentials: request.credentials,
      cache: request.cache
    }, options);

    return subject.asObservable();
  }
}
