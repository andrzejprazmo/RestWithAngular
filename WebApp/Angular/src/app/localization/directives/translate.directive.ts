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
    if (!this.translateKey) {
      if (this.element.nativeElement.childNodes.length > 0) {
        const translateKeyNode = this.element.nativeElement.childNodes[0];
        this.translateKey = translateKeyNode.wholeText;
      }
    }
    if (this.translateKey) {
      this.translateValue = this.store.getValue(this.translateKey);
      this.element.nativeElement.innerHTML = this.translateValue;
    }
  }
}
