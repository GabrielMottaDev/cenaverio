import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  localesRelation: any = {};
  locales: any = {};
  currentLocale: any = {};

  constructor(private readonly http: HttpClient) {
    this.http.get('/assets/locales/locales.json', {}).subscribe((res) => {
      this.localesRelation = res;
      let localeArray = Object.keys(this.localesRelation);
      let promises: any = [];
      localeArray.forEach(locale => {
        promises.push(this.http.get('/assets/locales/' + locale + '.json', {}).toPromise());
      });
      Promise.all(promises).then((res: any) => {
        res.forEach((localeSheet: any) => {
          this.locales[localeSheet.locale] = localeSheet;
        });
        this.setLocale(environment.defaultLanguage);
      });
    });
  }

  get(localeString: string): any {
    let localeArray = localeString.split('.');
    let currentLocalePointer = this.currentLocale;
    for(let i = 0; i < localeArray.length; i++){
      let localePart = localeArray[i];
      try {
        currentLocalePointer = currentLocalePointer[localePart];
      } catch(ex) {
        // nao carregou o locale ainda
      }
    }
    return currentLocalePointer;
  }

  setLocale(locale: string): void {
    let selectedLocale = this.locales[locale];
    if(selectedLocale == null){
      return;
    }
    this.currentLocale = selectedLocale;
  }
  
}
