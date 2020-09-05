import { Injectable } from '@angular/core';

const PRE_BOOKING = 'list-detail';

@Injectable({
    providedIn: 'root'
}
)
export class SessionService {
    constructor() {}

    clearSession() {
        sessionStorage.clear();
    }

    setCharterDetail(value: any) {
        sessionStorage.setItem(PRE_BOOKING, JSON.stringify(value));
    }

    getCharterDetail(): any {
        return JSON.parse(sessionStorage.getItem(PRE_BOOKING));
    }
}
