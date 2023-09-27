import { Injectable, Optional } from '@angular/core';
import { Observable, Subscription, forkJoin, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalizationStore } from './localization.store.';

export class LocalizationServiceConfig {
  fileExtensions?: string;
  localizationUrl?: string;
}

export interface LocalizationLoaderConfig {
  lang: string,
  url: string,
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private config?: LocalizationServiceConfig;

  constructor(private http: HttpClient, private store: LocalizationStore, @Optional() config?: LocalizationServiceConfig) {
    this.config = config;
  }

  public use(lang: string) {
    this.store.currentLang = lang;
    this.store.currentLangChange$.next(lang);
  }

  public load(loaderConfigs: LocalizationLoaderConfig[]): Observable<any> {
    const loaders = [];
    for (var i = 0; i < loaderConfigs.length; i++) {
      loaders.push(this.http.get(loaderConfigs[i].url));
    }
    return forkJoin(loaders).pipe(map(result => {
      for (var i = 0; i < result.length; i++) {
        this.store.addStore(loaderConfigs[i].lang, result[i]);
      }
    }));
  }

  public getValue(key: string): string {
    return this.store.getValue(key);
  }
}
