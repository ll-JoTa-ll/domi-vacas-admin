import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';


let httpOptions = {
    headers: new HttpHeaders()
};

@Injectable({
    providedIn: 'root'
})

export class getUsersByCompanyService{
    private url_users: string = environment.url_customer + 'User/GetUserPartnerClub';
    constructor(private http: HttpClient){
    }
    
    ListUsers(data): Observable<any> {
        httpOptions.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.subsKey
        });
        const url = `${this.url_users}?${'companyId=' + data}`;
        return this.http.get<any>(url, httpOptions);
    }


}