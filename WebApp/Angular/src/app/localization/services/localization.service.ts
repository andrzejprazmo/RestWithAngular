import { Injectable, Optional } from '@angular/core';
import { Observable, Subscription, forkJoin, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalizationStore } from './localization.store.';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private http: HttpClient, private store: LocalizationStore) {  }

  public use(lang: string) {
    this.store.currentLang = lang;
    this.store.currentLangChange$.next(lang);
  }

  public load(module: string): Observable<any> {
    const loaders = [
      { lang: 'pl', http: this.http.get(`./assets/i18n/${module}/pl.json`) },
      { lang: 'en', http: this.http.get(`./assets/i18n/${module}/en.json`) },
    ];
    return forkJoin(loaders.map(l => l.http)).pipe(map(result => {
      for (var i = 0; i < result.length; i++) {
        this.store.addStore(loaders[i].lang, result[i]);
      }
    }));
  }

  public getValue(key: string): string {
    return this.store.getValue(key);
  }
}
