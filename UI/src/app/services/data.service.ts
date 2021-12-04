import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'src/assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  rootURL = config.fusekiURL;

  sparql(query) {
    return this.http.get<any>(this.rootURL, { params: { 'query': query } });
  }
}
