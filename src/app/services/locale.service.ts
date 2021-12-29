import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  public locale$ : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private locale  = this.locale$.asObservable();

  localesRelation: any = {};
  locales: any = {};

  constructor(private readonly http: HttpClient, private cookieService: CookieService) {
    this.init();
  }

  getUserLocale(): string {
    let userLocale = navigator.language.toLocaleLowerCase();
    let forcedLocale = this.cookieService.get('language');
    if(forcedLocale != null){
      userLocale = forcedLocale;
    }
    return userLocale;
  }  

  init() {
    this.http.get('./assets/locales/locales.json', {}).subscribe((res) => {
      this.localesRelation = res;
      let localeArray = Object.keys(this.localesRelation);
      let promises: any = [];
      localeArray.forEach(locale => {
        promises.push(this.http.get('./assets/locales/' + locale + '.json', {}).toPromise());
      });
      Promise.all(promises).then((res: any) => {
        res.forEach((localeSheet: any) => {
          this.locales[localeSheet.locale] = localeSheet;
        });
        // var userLang = navigator.language || navigator.userLanguage; 
        // alert(this.getUserLocale());
        this.setLocale(this.getUserLocale());
      });
    });
  }

  get(localeString: string): any {
    
    let localeArray = localeString.split('.');
    let currentLocalePointer = this.locale$.value;
    if(currentLocalePointer) {
      for(let i = 0; i < localeArray.length; i++){
        let localePart = localeArray[i];
        try {
          currentLocalePointer = currentLocalePointer[localePart];
        } catch(ex) {
          // nao carregou o locale ainda
        }
      }
  
      // console.log(currentLocalePointer)
      let resultTxt: String = currentLocalePointer;
  
      if(typeof resultTxt != 'undefined') {
        let it = true;
        while(resultTxt.includes('**')) {
          if(it) {
            resultTxt = resultTxt.replace('**', '<b>');
            it = false;
          } else {
            resultTxt = resultTxt.replace('**', '</b>');
            it = true;
          }
        }
        it = true;
        while(resultTxt.includes('*')) {
          if(it) {
            resultTxt = resultTxt.replace('*', '<i>');
            it = false;
          } else {
            resultTxt = resultTxt.replace('*', '</i>');
            it = true;
          }
        }
        it = true;
      }
  
      return resultTxt;
    } else {
      return null;
    }
  }

  setLocale(locale: string): void {
    let selectedLocale = this.locales[locale];
    if(selectedLocale == null){
      selectedLocale = this.locales[environment.defaultLanguage];
    }
    if(selectedLocale == null){
      return;
    }
    this.cookieService.put('language', locale);
    this.locale$.next(selectedLocale);
  }
  
}