import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable()
export class CharterService {

  private urlreports: string = environment.urlCharter + 'Charter/GetCharterFlight?isAdministrator=true';
  private urlCharterPassenger: string = environment.urlCharter + 'Transaction/GetCharterPassenger';

    constructor(
        private http: HttpClient
    ) { }



    listServices(): Observable<any> {
      httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.subsKey
      });
      return this.http.get<any>(`${this.urlreports}`, httpOptions);
    }

    getCharterPassenger(data): Observable<any> {
      httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.subsKey
      });
      const url = `${this.urlCharterPassenger}?${'charterFlightId=' + data}`;
      return this.http.get<any>(url, httpOptions);
    }


}
