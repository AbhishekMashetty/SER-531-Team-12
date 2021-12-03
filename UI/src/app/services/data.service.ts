import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://ec2-54-167-64-59.compute-1.amazonaws.com:3030/ds/query'

  sparql(query) {
    return this.http.get<any>(this.rootURL, { params: { 'query': query } });
  }
}
