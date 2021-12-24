import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('void', style({ opacity: '0' })),
      transition('* => void', [
        animate('800ms ease-out')
      ])
    ])
  ]
})
export class LoaderComponent implements OnInit {

  isLoading = true;
  iconLoading = faSpinner;
  loaderMessage = "...";
  
  constructor(
    private readonly loaderService : LoaderService,
    public readonly localeService: LocaleService
    ) { }

  ngOnInit(): void {
    let userLocale = this.localeService.getUserLocale();
    if(userLocale.startsWith('pt')) {
      this.loaderMessage = "Carregando...";
    } else if(userLocale.startsWith('en')) {
      this.loaderMessage = "Loading...";
    } else if(userLocale.startsWith('es')) {
      this.loaderMessage = "Cargando...";
    } else {
      this.loaderMessage = "Loading...";
    }
    this.loaderService.loader.subscribe((status) => {
      if(this.isLoading == false){
        return;
      }
      let body = document.getElementsByTagName('body')[0];
      if(status == false) {
        setTimeout(() => {
          this.isLoading = false;
          body.style.overflow = '';
          window.scroll(0,0);
        }, 800);
      } else {
        this.isLoading = true;
        body.style.overflow = 'hidden';
      }
    })
  }

}
