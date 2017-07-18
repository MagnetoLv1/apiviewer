import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnChanges, OnInit {

  private _response: Response;
  private _body: String;

  test: Object = {
    'result': 1,
    'data': []
  }
  str: string = '{    "result": 1,    "data": []  }';

  @Input() set response(res: Response) {
    if (!res) return;
    this._response = res;
    if (!this._response.body) return;
    this._response.text().then(text => this._body = text);

  }
  constructor() { }

  ngOnChanges(changes: {}) {
    console.log('ngOnChanges', changes);
  }

  get test2() {// preserve newlines, etc - use valid JSON
    return JSON.parse(this.str);
  }
  get body() {
    return this._body;
  }

  get cookies() {
    return this._response.headers.get('Set-Cookie');
  }

  get headers() {
    return this._response.headers;
  }
  ngOnInit() {
  }

}
