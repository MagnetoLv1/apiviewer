import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map'
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CollectionService {

  headers: Headers;
  app: firebase.app.App;
  constructor(private http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Access-Control-Allow-Origin', '*');

    this.app = firebase.initializeApp({
      apiKey: "AIzaSyBM_wKB_LYG2bdF-iFYaIaFHNcgetNCFPI",
      authDomain: "apiviewer.firebaseapp.com",
      databaseURL: "https://apiviewer.firebaseio.com",
      projectId: "apiviewer",
      storageBucket: "apiviewer.appspot.com",
      messagingSenderId: "293629322300"
    });


  }


  getCollection(): Observable<Object> {
    const collectionSubject: Subject<Object> = new Subject<Object>();
    var apiRef: firebase.database.Reference = firebase.database().ref('/api');
    apiRef.on('value', (snapshot) => {
      collectionSubject.next(snapshot.val());
    });

    return collectionSubject.asObservable();

    /*
    const options = new RequestOptions({
      headers: this.headers
    });
    

    return this.http.request('http://lomi525.cafe24.com/collection.json', options)
      .map((response: Response) => {
        return response.json();
      });
      */
  }



  saveItem(path, item): void | number {
    firebase.database().ref(path).set(item);
  }

}
