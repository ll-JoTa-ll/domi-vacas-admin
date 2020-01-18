import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as config from '../../shared/config';
import { Response } from '../../shared/response.model';
import { Package } from './package.model';
import { Status } from 'src/app/shared/status.model';

@Injectable()
export class PackageService {

    constructor(
        private http: HttpClient
    ) { }

    list(name: string) {
        const params = new HttpParams()
          .set('search', name);

        return this.http.get<Response<Package[]>>(config.getPackageListUrl(config.PACKAGE_LIST_METHOD), {params});
    }

    get(id: string) {
        const method = config.PACKAGE_GET_METHOD + config.SLASH + id;
        return this.http.get<Response<Package>>(config.getPackageDetailUrl(method));
    }

    copy(ob) {
        // const method = config.PACKAGE_COPY_METHOD + config.SLASH + id;
        return this.http.post<Response<Package>>(config.getPackageCopylUrl(config.PACKAGE_COPY_METHOD), ob);
    }

    save(pack: Package) {
        return this.http.post<Response<Package[]>>(config.getPackageSaveUrl(config.PACKAGE_SAVE_METHOD), pack);
    }

    saveFormData(formdata: FormData) {
        // return this.http.post<Response<Package[]>>(config.getPackageSaveUrl(config.PACKAGE_SAVE_METHOD_FORM), formdata);
        return this.http.post<Response<Package[]>>(config.getPackageSaveUrl(config.PACKAGE_SAVE_METHOD), formdata);
    }

    updateFormData(formdata: FormData) {
        // return this.http.post<Response<Package[]>>(config.getPackageSaveUrl(config.PACKAGE_SAVE_METHOD_FORM), formdata);
        return this.http.put<Response<Package[]>>(config.getPackageSaveUrl(config.PACKAGE_UPDATE_METHOD), formdata);
    }

    savePack(formdata) {
        console.log(formdata);
        return this.http.post<Response<Package[]>>(config.getPackageSaveUrl(config.PACKAGE_SAVE_METHOD), formdata);
    }

    updateStatus(status: Status) {
        return this.http.put<Response<Package[]>>(config.getPackageUpdateStatus(config.PACKAGE_UPDATE_STATUS_METHOD), status);
    }

    listAmenities() {
        return this.http.get<Response<Package[]>>(config.getAmenitiesUrl(config.AMENITIES_SELECT_METHOD));
    }

    getHotels(name: string) {
        const params = new HttpParams()
        .set('search', name);
        return this.http.get<Response<Package[]>>(config.getHotelsUrl(config.HOTELS_SELECT_METHOD), {params});
    }

    getAirlines() {
        return this.http.get<Response<Package[]>>(config.getAirlinesUrl(config.AIRLINE_SELECT_METHOD));
    }
}
