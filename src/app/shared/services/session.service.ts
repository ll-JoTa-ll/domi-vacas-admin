import { Injectable } from '@angular/core';

const PRE_BOOKING = 'list-detail';
const REPORT_DETAIL = 'report-detail';
const REFRESH_TABLE = 'refresh-table';
const PACKAGE_DETAIL = 'package-detail';

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

  setPackageDetail(value: any) {
    sessionStorage.setItem(PACKAGE_DETAIL, JSON.stringify(value));
  }

  getPackageDetail(): any {
    return JSON.parse(sessionStorage.getItem(PACKAGE_DETAIL));
  }

  setRefreshTable(value: any) {
    sessionStorage.setItem(REFRESH_TABLE, JSON.stringify(value));
  }

  getRefreshTable(): any {
    return JSON.parse(sessionStorage.getItem(REFRESH_TABLE));
  }
}
