import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';


let httOptions = {
    headers: new HttpHeaders()
};

@Injectable({
    providedIn: 'root'
})

//Servicio sin Parametros
export class GetCompanyService {
    private url_companys: string = environment.url_customer + 'Company/GetCompany';
    constructor(private http: HttpClient){
    }

    ListCompany(): Observable<any[]>{
        httOptions.headers = new HttpHeaders({
            'Ocp-Apim-Subscription-Key': environment.subsKey,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.url_companys}`, httOptions);
    }
}


