import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as config from '../../shared/config';
import { Response } from '../../shared/response.model';
import { Login } from './login.model';
import { User } from './user.model';

@Injectable()
export class SecurityService {

    constructor(
        private http: HttpClient
    ) { }

    login(login: Login) {
        return this.http.post<Response<User>>(config.getLoginUrl(config.LOGIN_METHOD), login);
    }
}
