import { Injectable } from "@angular/core";

const COTIZACION_DETAIL = 'cotizacion_detail';

@Injectable({
    providedIn: 'root'
}
)
export class SessionService {
    constructor() {}

    clearSession() {
        sessionStorage.clear();
    }

    setCotizacionDetail(value: any) {
        sessionStorage.setItem(COTIZACION_DETAIL, JSON.stringify(value));
    }

    getCotizacionDetail(): any {
        return JSON.parse(sessionStorage.getItem(COTIZACION_DETAIL));
    }
}