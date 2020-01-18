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
      // const format = dd + '/' + mm + '/' + yyyy;
      const format = mm + '/' + dd + '/' + yyyy;
      return format;
    } else {
      return '';
    }
  }


export function formatDateddmmyyyy(stringDate: string) {
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
      // const format = dd + '/' + mm + '/' + yyyy;
      const format = mm + '/' + dd + '/' + yyyy;
      return format;
    } else {
      return '';
    }
  }

export function ddmmyyyytoDate(cadena: string) {
  let array = cadena.split('/');
  if (array.length >= 3) {
    let d = parseInt(array[0]);
    let m = parseInt(array[1]) - 1;
    let y = parseInt(array[2]);
    return new Date(y, m, d);
  } else {
    return new Date();
  }
}

export function getUrlIcon(icon: string) {
    return config.urlIcons + icon + '.svg';
  }

