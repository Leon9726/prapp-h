import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService, private config: ConfigService) { }

  
  langs: string[] = [];

  lang = "";

  ngOnInit(): void {
    this.langs = this.config.getValueFromConfig('lingue');
    this.lang = this.translateService.getBrowserLang();
    if (this.langs.indexOf(this.lang) > -1) {
      this.translateService.setDefaultLang(this.lang);
    } else {
      this.translateService.setDefaultLang('it');
    }
  }

  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
    this.lang = lang.toUpperCase()
  }

}
