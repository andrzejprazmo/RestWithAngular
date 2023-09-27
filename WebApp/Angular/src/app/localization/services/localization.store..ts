import { Injectable } from '@angular/core';
import { StorePackage } from '../models/store.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationStore {

  store: StorePackage[] = [];
  currentLang!: string;
  currentLangChange$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() { }

  addStore(lang: string, module: string, value: any) {
    let storePackage = this.store.filter(s => s.lang == lang)[0];
    if (!storePackage) {
      storePackage = {
        lang: lang,
        items: []
      }
      this.store.push(storePackage);
    }
    let storeItem = storePackage.items.filter(i => i.module == module)[0];
    if (!storeItem) {
      storeItem = {
        module: module,
        value: value
      };
      storePackage.items.push(storeItem);
    }
  }

  getValue(key: string): string {
    if (this.currentLang) {
      const storePackage = this.store.filter(s => s.lang == this.currentLang)[0];
      if (storePackage) {
        const keyParts = key.split('.');
        for (const item of storePackage.items) {
          let obj = item.value;
          for (const part of keyParts) {
            obj = obj[part];
            if (!obj) {
              break;
            }
          }
          if (obj) {
            return obj;
          }
        }
      }
    }
    return key;
  }

  moduleExists(module: string, langs: string[]): boolean {
    let result = true;
    for (const lang of langs) {
      const storePackage = this.store.filter(s => s.lang == lang).map(s => s.items)[0];
      if (!storePackage) {
        result = false;
        break;
      }
      if (!storePackage.map(s => s.module).includes(module)) {
        result = false;
        break;
      }
    }
    return result;
  }
}
