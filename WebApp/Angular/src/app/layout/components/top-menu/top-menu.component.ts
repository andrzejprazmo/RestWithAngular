import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  languageName!: string;
  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageName = this.languageService.getLanguage().toUpperCase();
    this.languageService.lang$.subscribe(value => {
      if (value) {
        this.languageName = value.toUpperCase();
      }
    });
  }

  toggleLanguage() {
    const lang = this.languageService.getLanguage() === 'pl' ? 'en' : 'pl';
    this.languageService.setLanguage(lang);
  }

}
