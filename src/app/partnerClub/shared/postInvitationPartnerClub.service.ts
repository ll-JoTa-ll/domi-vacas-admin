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

export class PostInvitationPartnerClubService{
    private url_invitation: string = environment.url_customer + 'PartnerClub/InvitationPartnerClub';
    constructor(private http: HttpClient){
    }

    enviaInvitacion(data): Observable<any> {
        httpOptions.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.subsKey
        });
        return this.http.post<any>(`${this.url_invitation}`, data, httpOptions);
    }
}




