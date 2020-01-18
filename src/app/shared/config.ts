export const baseUrl = 'http://172.16.7.99:8015/';
// export const baseUrl = 'http://172.16.7.99:63862/';
// export const baseUrl = 'http://52.190.24.114/vacation/';    //uat
// export const baseUrl = 'http://52.142.32.21/vacation/'; //produccion

export const PACKAGE_LIST_METHOD = 'VacationPackage/List';
export const PACKAGE_GET_METHOD = 'VacationPackage/Edit';
export const PACKAGE_UPDATE_STATUS_METHOD = 'VacationPackage/Status';
export const PACKAGE_UPLOAD_IMAGE_METHOD = 'VacationPackage/Upload';
export const PACKAGE_SAVE_METHOD = 'VacationPackage';
export const PACKAGE_UPDATE_METHOD = 'VacationPackage';
export const CATEGORY_SELECT_METHOD = 'Category/Combo';
export const AMENITIES_SELECT_METHOD = 'AmenityShowCase/list';
export const HOTELS_SELECT_METHOD = 'Hotel/List';
export const ICON_LIST_METHOD = 'Icon/List';
export const AIRLINE_SELECT_METHOD = 'Airline/Combo';
export const LOGIN_METHOD = 'User/Login';
export const PACKAGE_COPY_METHOD = 'VacationPackage/Clone';

export const PACKAGE_SAVE_METHOD_FORM = 'VacationPackage/upload1';


export const urlIcons = 'https://vacationuatsa.z13.web.core.windows.net/icons/';
export const urlImages = 'https://vacationadminuatsa.blob.core.windows.net/images/';

export const LIMIT_OF_AMENITIES = 4;

export const SLASH = '/';
const DEBUG = false;

export function getPackageListUrl(method: string) {
    if (DEBUG) {
        return 'http://www.mocky.io/v2/5e16498534000024f3406a7a';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getPackageSaveUrl(method: string) {
    if (DEBUG) {
        return '';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getLoginUrl(method: string) {
    if (DEBUG) {
        return '';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getPackageUpdateStatus(method: string) {
    if (DEBUG) {
        return '';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getUploadImageUrl(method: string) {
    if (DEBUG) {
        return '';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getCategorySelectUrl(method: string) {
    if (DEBUG) {
        return 'http://www.mocky.io/v2/5e164bb534000071eb406a7c';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getAmenitiesUrl(method: string) {
    if (DEBUG) {
        return 'http://www.mocky.io/v2/5e16531434000097e7406a86';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getHotelsUrl(method: string) {
    if (DEBUG) {
        return '';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getAirlinesUrl(method: string) {
    if (DEBUG) {
        return 'http://www.mocky.io/v2/5e1e3de83600001cf4c746a8';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getIconListUrl(method: string) {
    if (DEBUG) {
        return 'http://www.mocky.io/v2/5e1cb74e3200002b002287f6';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getPackageDetailUrl(method: string) {
    if (DEBUG) {
        return 'http://www.mocky.io/v2/5e208aaa300000d796d1f0d5';
        // return 'http://www.mocky.io/v2/5e1f9bc4310000c477189a00';
    } else {
        return baseUrl + 'api/' + method;
    }
}

export function getPackageCopylUrl(method: string) {
    if (DEBUG) {
        return '';
    } else {
        return baseUrl + 'api/' + method;
    }
}
