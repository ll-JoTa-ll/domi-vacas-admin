import { Injectable } from "@angular/core";

const COTIZACION_DETAIL = 'cotizacion_detail';
const INSERT_UPDATE = 'insert_update';
const DATA_USER = 'data_user';

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

    setInsertUpdate(value: any) {
        sessionStorage.setItem(INSERT_UPDATE, JSON.stringify(value));
    }

    getInsertUpdate(): any {
        return JSON.parse(sessionStorage.getItem(INSERT_UPDATE));
    }

    setUser(value: any) {
        sessionStorage.setItem(DATA_USER, JSON.stringify(value));
    }

    getUser(): any {
        return JSON.parse(sessionStorage.getItem(DATA_USER));
    }
}