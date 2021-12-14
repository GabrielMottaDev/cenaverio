import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  });

  constructor(private readonly contactFormService: ContactFormService, public readonly localeService: LocaleService) { }

  ngOnInit(): void {
  }

  submitContactForm(form: any): void {
    let data = form.value;
    console.log(data);
    this.contactFormService.sendContactForm(data).subscribe((res) => {
      console.log(res);
    });
  }

  
  get subject() { return this.contactForm.get('subject'); }
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get telephone() { return this.contactForm.get('telephone'); }
  get message() { return this.contactForm.get('message'); }


  public textPattern = { '0': { pattern: new RegExp('\[a-zA-Z \u00C0-\u017F\]')} };
}