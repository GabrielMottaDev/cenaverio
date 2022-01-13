import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(private readonly http: HttpClient) { }

  private API_URL = "https://ulfhtws52e.execute-api.sa-east-1.amazonaws.com/prod/form/submit";

  sendContactForm(data: any) {
    let buildedData = this.buildData(data);
    console.log(buildedData);
    return this.http.post(this.API_URL, buildedData);
  }

  buildData(data: any) {
    let service = "cenave";
    let captcha = data['recaptchaReactive'];
    let params: any[] = [];

    params.push({ 'key': 'Assunto', 'value': data['subject'] })
    params.push({ 'key': 'Nome', 'value': data['name'] })
    params.push({ 'key': 'E-mail', 'value': data['email'] })
    params.push({ 'key': 'Telefone', 'value': data['telephone'] })
    params.push({ 'key': 'Mensagem', 'value': data['message'] })

    return {
      "service": service,
      "captcha": captcha,
      "params": params
    };
  }

}
