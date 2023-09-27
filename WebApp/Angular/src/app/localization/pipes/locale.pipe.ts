import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationStore } from '../services/localization.store.';

@Pipe({
  name: 'translate',
  pure: false
})
export class LocalePipe implements PipeTransform {
  translateKey!: string;
  translateValue!: string;

  constructor(private localizationStore: LocalizationStore) {
  }

  transform(value: string): string {
    this.translateKey = value;
    this.translateValue = this.getTranslation(value);

    this.localizationStore.currentLangChange$.subscribe(lang => {
      if (lang && this.translateKey) {
        this.translateValue = this.getTranslation(this.translateKey);
      }
    });
    return this.translateValue;
  }

  getTranslation(key: string): string {
    return this.localizationStore.getValue(key);
  }
}
