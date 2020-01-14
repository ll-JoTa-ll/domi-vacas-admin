import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as config from '../../shared/config';
import { Response } from '../../shared/response.model';
import { Status } from 'src/app/shared/status.model';
import { Select } from 'src/app/shared/select.model';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    selectList() {
        return this.http.get<Response<Select[]>>(config.getCategorySelectUrl(config.CATEGORY_SELECT_METHOD));
    }
}
