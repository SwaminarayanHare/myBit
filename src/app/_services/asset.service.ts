import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Asset } from '../_models';

@Injectable()
export class AssetService {
    constructor(private http: HttpClient) { 
    }
   
    getAll() {
        return this.http.get<Asset[]>(appConfig.apiUrl + '/asset');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/asset/' + _id);
    }
    getCurrentAssetVal() {
        return this.http.get(appConfig.apiUrl + '/asset/getCurrentAssetVal');
    }
    create(asset: Asset) {
        return this.http.post(appConfig.apiUrl + '/asset/add', asset);
    }

    update(asset: Asset) {
        return this.http.put(appConfig.apiUrl + '/asset/' + asset._id, asset);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/asset/' + _id);
    }
}