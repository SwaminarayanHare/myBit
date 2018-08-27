import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Stock } from '../_models';

@Injectable()
export class StockService {
    constructor(private http: HttpClient) { 
    }
   
    getAll() {
        return this.http.get<Stock[]>(appConfig.apiUrl + '/stock');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/stock/' + _id);
    }

    create(stock: Stock) {
        return this.http.post(appConfig.apiUrl + '/stock/add', stock);
    }

    update(stock: Stock) {
        return this.http.put(appConfig.apiUrl + '/stock/' + stock._id, stock);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/stock/' + _id);
    }
}