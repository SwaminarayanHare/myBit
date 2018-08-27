import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Subscription } from '../_models';

import {  Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const httpOptions = {
    headers: new HttpHeaders({ 
        'X-CMC_PRO_API_KEY' : '178b2f50-5b3e-4669-8881-bd35505f6c56',
        'Access-Control-Allow-Origin':  'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-CMC_PRO_API_KEY'})
  };

@Injectable()
export class PricingService {

    //private url = "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&limit=5000&cryptocurrency_type=tokens&convert=INR"; 
    private url ="https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/?limit=500&convert=INR";
    private coinlisturl = "https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v2/listings/"
    
    constructor(private http: HttpClient) { 
    }
   
    getData(): Observable<any[]> {

      return this.http.get(this.url)
        .map(this.extractData)
        .catch(this.handleError);
    }
   
    getCoinList(): Observable<any[]> {
        return this.http.get(this.coinlisturl)
          .map(this.extractData)
          .catch(this.handleError);
      }
    private extractData(res: Response) {
      let body = res;
      return body || [];
    }
    private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server   error';
      console.log(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }

    getAll() {
        return this.http.get<Subscription[]>(appConfig.apiUrl + '/subscription');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/subscription/' + _id);
    }

    create(subscription: Subscription) {
        return this.http.post(appConfig.apiUrl + '/subscription/add', subscription);
    }

    update(subscription: Subscription) {
        return this.http.put(appConfig.apiUrl + '/subscription/' + subscription._id, subscription);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/subscription/' + _id);
    }
    getByUserId(_id: string) {
        return this.http.get(appConfig.apiUrl + '/subscription/getsub/' + _id);
    }
}