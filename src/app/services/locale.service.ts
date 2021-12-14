import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(private readonly http: HttpClient) { }

  getLocale(localeLanguage: string) {
    return this.http.get('/assets/locales/' + localeLanguage + '.json', {});
  }
  
}
