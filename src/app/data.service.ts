import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) {

  }


  // apiUrl = 'http://localhost:5000';
  apiUrl = 'https://hce-wallet.herokuapp.com';

  addItem(to: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${to}`, data, { headers: this.headers });
  }
  updateItem(to: any, data: any) {
    return this.http.put(`${this.apiUrl}/${to}`, data, { headers: this.headers });
  }
  deleteItem(to: any) {
    return this.http.delete(`${this.apiUrl}/${to}`);
  }

  getFilterData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/getFilterData', data);
  }


  getItem(to: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${to}`);
  }


  fundTranfer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transferFund`, data);
  }

}
