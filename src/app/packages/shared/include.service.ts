import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Icon } from './icon.model';
import { Response } from '../../shared/response.model';
import * as config from '../../shared/config';

@Injectable()
export class IncludeService {
    constructor(
        private http: HttpClient
    ) { }

    getIcons() {
        return this.http.get<Response<Icon[]>>(config.getIconListUrl(config.ICON_LIST_METHOD));
    }
}
