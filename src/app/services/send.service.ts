import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod, RequestOptionsArgs, ResponseOptions } from '@angular/http';
import parseuri from 'parseuri';
import { parse } from 'querystring';
import { ElectronService } from 'ngx-electron';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";


@Injectable()
export class SendService {

  headers: Headers;
  _response: Response;
  _behaviorSubject: Subject<Response>;

  constructor(private _electronService: ElectronService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('User-Agent', 'developer=anyman;PdboxTicket=.A32.7bbT56vyHM9fKZk.L8dNW9jvu8Flr2f1MdW2FGYrf4j1KN_D3MiAaZToxDYCF5i9eZnVaESChk94GWupCMMPRMMKTuLf0D7B2EJdWmmTox4dymRvMIzDjaYB_qYKIzLq-IepcwL4w6-HnleIv22qybJg5wO2E7MuusTJwQ8pQDVRPxYrvvDTv-JYvwcNWp_8Soyg1p1VGNNZC59INO-IeApNc5fY191tNSZq9Z7rbVo-cNupwbTNOH9ZrklgkaSPyk3L7AjQL_9fcOr9T3bkyKZn3ts9Jcu_NBaVxAn76BDjBY437buSSDgWKjLJ0hQjBRP9xBSOhen-o5zmd4Nh2q4H4YENL_QknBUO4iHsuhwBu2sQHwWSi1qnOatzXzTHr7bDKjX1f9zixDl982Obtq5_Q-Gs2P26eavUbn7wfioBYxxynuKQqAc9ZNzDpNIURGAQ-He_G3nbJBP5krsgAIv9tqsR9x8vTTnVfgGRGo3GnZY7DHjgDmh4WXXCjF_xHme51cy4nYsCpbxF8dNprP6XBPVukotkyiBLCAeont3BZCkOOmTGyzz5WGs;');
    this._response = new Response(new ResponseOptions());
    this._response.status = 404;
    const ro = new ResponseOptions();
    ro.body
    this._behaviorSubject = new Subject<Response>();
  }


  send(request: any) {
    console.log(1111111, this.headers.getAll('Content-Type'));
    this.headers.forEach(function (value, key) {
      console.log(key, value)
    });

    console.log(this._electronService.remote.net);
    console.log('RequestMethod.Delete=', RequestMethod.Delete);
    const url = parseuri('http://lomi525.cafe24.com/collection.json?a=b&c=d#23423');
    console.log('parseuri=', url);
    console.log('querystring=', parse(url.query));
    console.log(request);
    const options = new RequestOptions({
      headers: this.headers
    });

    return null;
  }

  call() {

    setTimeout(() => {
      this._behaviorSubject.next(this._response)
    }
      , 1000);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {


        console.log('request---------------------')
    const request = this._electronService.remote.net.request('http://api.m.afreecatv.com/broad/a/list')
    request.chunkedEncoding =false;
    request.on('response', (response) => {
      console.log(response.headers)
      console.log(`STATUS: ${response.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`)

      let total = 0;
      response.on('data', (chunk) => {
        total += chunk.length;
        console.log(`BODY------------------------`, total);
      })
      console.log(response.listeners);
      response.on('end', (dd) => {
        console.log('No more data in response.----------------')
      })
      response.on('aborted', () => {
        console.log('aborted------------------')
      })
      response.on('error', () => {
        console.log('error-------------')
      })
    })
    request.end()



    return this._behaviorSubject.asObservable();
  }
  /*
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._behaviorSubject.next(this._response);
    return this._behaviorSubject;

  }
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._behaviorSubject.next(this._response);
    return this._behaviorSubject;

  }
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._behaviorSubject.next(this._response);
    return this._behaviorSubject;

  }
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._behaviorSubject.next(this._response);
    return this._behaviorSubject;

  }
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._behaviorSubject.next(this._response);
    return this._behaviorSubject;
  }
  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._behaviorSubject.next(this._response);
    return this._behaviorSubject;

  }
  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._behaviorSubject.next(this._response);
    return this._behaviorSubject;

  }
  */
}
