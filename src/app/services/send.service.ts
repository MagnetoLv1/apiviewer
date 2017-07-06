import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import parseuri from 'parseuri';
import {parse} from 'querystring';


@Injectable()
export class SendService {

  headers: Headers;

  constructor(private http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('User-Agent', 'developer=anyman;PdboxTicket=.A32.7bbT56vyHM9fKZk.L8dNW9jvu8Flr2f1MdW2FGYrf4j1KN_D3MiAaZToxDYCF5i9eZnVaESChk94GWupCMMPRMMKTuLf0D7B2EJdWmmTox4dymRvMIzDjaYB_qYKIzLq-IepcwL4w6-HnleIv22qybJg5wO2E7MuusTJwQ8pQDVRPxYrvvDTv-JYvwcNWp_8Soyg1p1VGNNZC59INO-IeApNc5fY191tNSZq9Z7rbVo-cNupwbTNOH9ZrklgkaSPyk3L7AjQL_9fcOr9T3bkyKZn3ts9Jcu_NBaVxAn76BDjBY437buSSDgWKjLJ0hQjBRP9xBSOhen-o5zmd4Nh2q4H4YENL_QknBUO4iHsuhwBu2sQHwWSi1qnOatzXzTHr7bDKjX1f9zixDl982Obtq5_Q-Gs2P26eavUbn7wfioBYxxynuKQqAc9ZNzDpNIURGAQ-He_G3nbJBP5krsgAIv9tqsR9x8vTTnVfgGRGo3GnZY7DHjgDmh4WXXCjF_xHme51cy4nYsCpbxF8dNprP6XBPVukotkyiBLCAeont3BZCkOOmTGyzz5WGs;');

  }


  send(requestData: any) {
    console.log(1111111, this.headers.getAll('Content-Type'));
    this.headers.forEach(function (value, key) {
      console.log(key, value)
    });

    const url = parseuri('http://lomi525.cafe24.com/collection.json?a=b&c=d#23423');
    console.log('parseuri=',  url);
    console.log('querystring=', parse(url.query));
    console.log(requestData);
    const options = new RequestOptions({
      headers: this.headers
    });

    return this.http.request('http://lomi525.cafe24.com/collection.json', options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }
}
