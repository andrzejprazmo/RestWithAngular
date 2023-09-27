import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { LocalizationService } from '../../localization/services/localization.service';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private cookieKey: string = 'GlobalLang';
  public lang$ = new BehaviorSubject<string>('');
  constructor(private cookieService: CookieService, private localizationService: LocalizationService) {
    this.getLanguage();
  }

  public getLanguage(): string {
    let lang = this.cookieService.get(this.cookieKey);
    if (typeof lang === 'undefined') {
      lang = 'pl';
      this.setLanguage(lang);
    }
    return lang;
  }

  public setLanguage(lang: string) {
    this.cookieService.put(this.cookieKey, lang, {

    });
    this.localizationService.use(lang);
    this.lang$.next(lang);
  }
}
