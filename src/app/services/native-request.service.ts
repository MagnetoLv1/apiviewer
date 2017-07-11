import { Injectable, EventEmitter } from '@angular/core';
import { RequestOptionsArgs } from "@angular/http";
import { ElectronService } from 'ngx-electron';

@Injectable()
export class NativeRequestService {


  _ipcRenderer: Electron.IpcRenderer;

  constructor(private _electronService: ElectronService) {
    this._ipcRenderer = _electronService.ipcRenderer;
  }

  /**
   * 
   * @param url 
   * @param options 
   */
  request(url: string | Request, options?: RequestOptionsArgs): Promise<Response> {

    let responseInit: ResponseInit = null;
    let request: Request;
    let body = '';
    if (typeof url == 'string') {
      request = new Request(url);
    }
    else {
      request = url;
    }

    return new Promise((resolve, reject) => {

      this._ipcRenderer.on('remote.response-start', (event, statusCode, statusMessage, headers) => {
        responseInit = {
          status: statusCode,
          statusText: statusMessage,
          headers: headers
        }
      });
      this._ipcRenderer.on('remote.response-body', (event, chunk) => {
        console.log('remote.response-body---------- ',chunk.toString())
        body += chunk.toString();
      })
      this._ipcRenderer.on('remote.response-complete', (event) => {
        let response = new Response(body, responseInit);
        resolve(response);
      })
      this._ipcRenderer.on('remote.request-finish', (event) => {
        //console.log(arg) // prints "pong" 
      })
      this._ipcRenderer.on('remote.request-abort', (event) => {
        reject(Error('abort'));
      })
      this._ipcRenderer.on('remote.request-error', (event, error) => {
        console.log('remote.request-error', error, error.toString())
        reject(error);
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
    })
  }
}
