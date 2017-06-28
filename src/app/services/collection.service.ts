import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class CollectionService {

  headers: Headers;

  constructor(private http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }


  getCollection() {
    console.log('login');

    const options = new RequestOptions({
      headers: this.headers
    });

    return this.http.request('assets/collection.json', options)
      .map((response: Response) => {
        return response.json();
      });
  }
}
