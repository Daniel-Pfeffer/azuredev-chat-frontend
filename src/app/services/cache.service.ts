import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {
  }

  private cache = new Map<string, any>();

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}
