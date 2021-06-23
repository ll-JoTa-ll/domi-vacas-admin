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
    private url_document: string = environment.url_customer + 'DocumentType/';
    private url_currency: string = environment.url_customer + 'Currency/';
    private url_sendData: string = environment.baseUrl + 'Cotizaciones/InsertUpdateCotizaciones';
    private url_packages: string = environment.baseUrl + 'Report/GetPackageOfflineList';
    private url_packages_detail: string = environment.baseUrl + 'Report/GetPackageOfflineDetail';
    private url_update_payment: string = environment.baseUrl + 'Transaction/UpdatePaymentOffline';

    ListCotizacion(): Observable<any[]> {
        httpOptions.headers = new HttpHeaders({
            'Ocp-Apim-Subscription-Key': environment.subsKey,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.url_search}`, httpOptions);
      }

      ListPackages(): Observable<any[]> {
        httpOptions.headers = new HttpHeaders({
            'Ocp-Apim-Subscription-Key': environment.subsKey,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.url_packages}`, httpOptions);
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

      getPackageDetail(data): Observable<any[]> {
        httpOptions.headers = new HttpHeaders({
            'Ocp-Apim-Subscription-Key': environment.subsKey,
            'Content-Type': 'application/json'
        });
        const url = `${this.url_packages_detail}${'/' + data}`;
        return this.http.get<any[]>(url, httpOptions);
      }

      UpdatePayment(data): Observable<any> {
        httpOptions.headers = new HttpHeaders({
            'Ocp-Apim-Subscription-Key': environment.subsKey,
            'Content-Type': 'application/json'
        });
        const url = `${this.url_update_payment}${'/' + data}`;
        return this.http.post<any>(url, httpOptions);
      }

      getDocument(): Observable<any> {
        httpOptions.headers = new HttpHeaders({
          'Content-Type': "application/json",
          'Ocp-Apim-Subscription-Key': environment.subsKey,
        });
        const url = `${this.url_document + 'GetDocumentTypeList'}?${'isAdministrator=' + false}`;
        return this.http.get<any>(url, httpOptions);
      }

      getCurrency(): Observable<any> {
        httpOptions.headers = new HttpHeaders({
          'Content-Type': "application/json",
          'Ocp-Apim-Subscription-Key': environment.subsKey,
        });
        const url = `${this.url_currency + 'GetCurrencyList'}?${'isAdministrator=' + false}`;
        return this.http.get<any>(url, httpOptions);
      }

      InsertUpdateCotizaciones(data): Observable<any> {
        httpOptions.headers = new HttpHeaders({
          'Ocp-Apim-Subscription-Key': environment.subsKey
        });
        return this.http.post<any>(`${this.url_sendData}`, data, httpOptions);
    }
}
