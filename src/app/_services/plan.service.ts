import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Plan } from '../_models';

@Injectable()
export class PlanService {
    constructor(private http: HttpClient) { 
    }
   
    getAll() {
        return this.http.get<Plan[]>(appConfig.apiUrl + '/plans');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/plans/' + _id);
    }

    create(plan: Plan) {
        return this.http.post(appConfig.apiUrl + '/plans/add', plan);
    }

    update(plan: Plan) {
        return this.http.put(appConfig.apiUrl + '/plans/' + plan._id, plan);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/plans/' + _id);
    }
}