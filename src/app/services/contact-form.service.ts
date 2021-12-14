import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(private readonly http: HttpClient) { }

  sendContactForm(data: any) {
    return this.http.get('https://gabrielmotta.dev/', data);
  }

}
