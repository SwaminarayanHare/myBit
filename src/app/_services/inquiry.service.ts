import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Inquiry } from '../_models';

@Injectable()
export class InquiryService {
    constructor(private http: HttpClient) { 
    }
   
    getAll() {
        return this.http.get<Inquiry[]>(appConfig.apiUrl + '/inquiry');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/inquiry/' + _id);
    }

    create(inquiry: Inquiry) {
        return this.http.post(appConfig.apiUrl + '/inquiry/add', inquiry);
    }

    update(inquiry: Inquiry) {
        return this.http.put(appConfig.apiUrl + '/inquiry/' + inquiry._id, inquiry);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/inquiry/' + _id);
    }
}