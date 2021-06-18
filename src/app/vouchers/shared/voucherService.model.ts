import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

let httpOptions = {
    headers: new HttpHeaders()
  };

@Injectable({
    providedIn: 'root'
})
export class VoucherService {


    token;
    key;

    constructor(private http: HttpClient){

    }

    private url_search: string = environment.baseUrl + 'Cotizaciones/GetCotizacionesReceptivo';
    private url_web: string = environment.baseUrl + 'Cotizaciones/GetCotizacionesWeb';
    private url_cotizacion: string = environment.baseUrl + 'Cotizaciones/GetCotizacionesByNro';

    ListCotizacion(): Observable<any[]> {
        httpOptions.headers = new HttpHeaders({
            'Ocp-Apim-Subscription-Key': environment.subsKey,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.url_search}`, httpOptions);
      }

      ListWeb(): Observable<any[]> {
        httpOptions.headers = new HttpHeaders({
            'Ocp-Apim-Subscription-Key': environment.subsKey,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.url_web}`, httpOptions);
      }

      GetCotizacion(data): Observable<any[]> {
        httpOptions.headers = new HttpHeaders({
            'Ocp-Apim-Subscription-Key': environment.subsKey,
            'Content-Type': 'application/json'
        });
        const url = `${this.url_cotizacion}?${'nroCotizacion=' + data}`;
        return this.http.get<any[]>(url, httpOptions);
      }
}
