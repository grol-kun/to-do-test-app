import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any | null {
    const result = localStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
