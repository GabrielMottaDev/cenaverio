import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({
    'subject': new FormControl(null, [ Validators.required, Validators.maxLength(50) ]),
    'name': new FormControl(null, [ Validators.required ]),
    'email': new FormControl(null, [ Validators.required, Validators.email ]),
    'telephone': new FormControl(null, [ Validators.required ]),
    'message': new FormControl(null, [ Validators.required, Validators.maxLength(255) ]),
    'recaptchaReactive' : new FormControl(null, Validators.required)
  });
  submitStatus: string = 'none';

  constructor(private readonly contactFormService: ContactFormService, public readonly localeService: LocaleService) { }

  ngOnInit(): void {
  }

  submitContactForm(form: FormGroup): void {
    if(this.submitStatus == 'sending'){
      return;
    }
    if(form.invalid){
      this.submitStatus = 'invalid';
      // this.contactForm.markAllAsTouched();
      return;
    }
    console.log(form);
    let data = form.value;
    
    this.submitStatus = 'sending';

    this.contactFormService.sendContactForm(data).subscribe((res) => {
      console.log(res);
      this.submitStatus = 'success';
    }, (err) => {
      this.submitStatus = 'error';
    });
  }

  
  get subject() { return this.contactForm.get('subject'); }
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get telephone() { return this.contactForm.get('telephone'); }
  get message() { return this.contactForm.get('message'); }
  get recaptchaReactive() { return this.contactForm.get('recaptchaReactive'); }


  public textPattern = { '0': { pattern: new RegExp('\[a-zA-Z \u00C0-\u017F\]')} };
}