import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Subscription } from '../_models';

@Injectable()
export class SubscriptionService {
    constructor(private http: HttpClient) { 
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