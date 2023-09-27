import { Directive, ElementRef, Input } from '@angular/core';
import { LocalizationStore } from '../services/localization.store.';

@Directive({
  selector: '[translate]'
})
export class TranslateDirective {
  @Input() set translate(key: string) {
    if (key) {
      this.translateKey = key;
      this.setValue();
    }
  }

  translateKey!: string;
  translateValue!: string;

  constructor(private store: LocalizationStore, private element: ElementRef) {
    store.currentLangChange$.subscribe(lang => {
      if (lang) {
        this.setValue();
      }
    });
  }

  setValue() {
    if (this.translateKey) {
      this.translateValue = this.store.getValue(this.translateKey);
      this.element.nativeElement.innerText = this.translateValue;
    }
  }
}
