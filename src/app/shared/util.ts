import * as config from '../shared/config';

export function formatddmmyyyy(stringDate: string) {
    if (stringDate) {
      const date = new Date(stringDate);
      let dd = date.getDate().toString();
      let mm = (date.getMonth() + 1).toString();
      const yyyy = date.getFullYear();
      if (date.getDate() < 10) {
        dd = '0' + dd;
      }
      if ((date.getMonth() + 1) < 10) {
        mm = '0' + mm;
      }
      const format = dd + '/' + mm + '/' + yyyy;
      return format;
    } else {
      return '';
    }
  }


export function getUrlIcon(icon: string) {
    return config.urlIcons + icon + '.svg';
  }