import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  get(key: string): any {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
