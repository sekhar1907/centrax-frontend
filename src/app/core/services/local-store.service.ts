import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  private ls = window.localStorage;
  private ss = window.sessionStorage;
  constructor() { }

  public setItem(key: string, value: any, storageType: string) {
    value = JSON.stringify(value);
    if (storageType === 'local') {
      this.ls.setItem(key, value);
    } else {
      this.ss.setItem(key, value);
    }
    return true;
  }

  public getItem(key: string, storageType: string) {
    let value: any;
    if (storageType === 'local') {
      value = this.ls.getItem(key);
    } else {
      value = this.ss.getItem(key);
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      // console.log(e)
      return null;
    }
  }
  public clear(storageType: string) {
    if (storageType === 'local') {
      this.ls.clear();
    } else {
      this.ss.clear();
    }
  }
}
