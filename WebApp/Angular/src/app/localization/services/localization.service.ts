import { Injectable, Optional } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalizationStore } from './localization.store.';

export class LocalizationServiceConfig {
  fileExtensions?: string;
  localizationUrl?: string;
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

  public load(module: string, langs: string[]): Observable<any> {
    if (!this.store.moduleExists(module, langs)) {
      if (this.config && module && langs) {
        const loaders = [];
        for (const lang of langs) {
          const url = `${this.config.localizationUrl}/${module}/${lang}.${this.config.fileExtensions}`;
          loaders.push(this.http.get(url));
        }
        return forkJoin(loaders).pipe(map(result => {
          for (var i = 0; i < result.length; i++) {
            this.store.addStore(langs[i], module, result[i]);
          }
        }));
      }
    }
    return of(null);
  }

  public getValue(key: string): string {
    return this.store.getValue(key);
  }
}
