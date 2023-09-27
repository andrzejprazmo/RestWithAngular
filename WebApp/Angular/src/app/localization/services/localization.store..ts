import { Injectable } from '@angular/core';
import { LanguageStore, StorePackage } from '../models/store.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationStore {

  list: LanguageStore[] = [];
  currentLang!: string;
  currentLangChange$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() { }

  addStore(lang: string, value: any) {
    let storePackage = this.list.filter(s => s.lang == lang)[0];
    if (!storePackage) {
      storePackage = {
        lang: lang,
        items: []
      }
      this.list.push(storePackage);
    }
    storePackage.items.push(value);
  }

  getValue(key: string): string {
    if (this.currentLang) {
      const items = this.list.filter(s => s.lang == this.currentLang).map(s => s.items)[0];
      if (items) {
        const keyParts = key.split('.');
        for (const item of items) {
          let json = item;
          for (const part of keyParts) {
            json = json[part];
            if (!json) {
              break;
            }
          }
          if (json) {
            return json;
          }
        }
      }
    }
    return key;
  }
}
