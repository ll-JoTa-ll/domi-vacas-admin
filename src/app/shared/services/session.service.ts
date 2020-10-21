import { Injectable } from '@angular/core';

const PRE_BOOKING = 'list-detail';
const REPORT_DETAIL = 'report-detail';

@Injectable({
  providedIn: 'root'
}
)
export class SessionService {
  constructor() { }

  clearSession() {
    sessionStorage.clear();
  }

  setCharterDetail(value: any) {
    sessionStorage.setItem(PRE_BOOKING, JSON.stringify(value));
  }

  getCharterDetail(): any {
    return JSON.parse(sessionStorage.getItem(PRE_BOOKING));
  }

  setReportDetail(value: any) {
    sessionStorage.setItem(REPORT_DETAIL, JSON.stringify(value));
  }

  getReportDetail(): any {
    return JSON.parse(sessionStorage.getItem(REPORT_DETAIL));
  }
}
