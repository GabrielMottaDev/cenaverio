import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../services/loader.service';
import { LocaleService } from '../services/locale.service';
import { Equipe } from '../shared/equipe';
import { BubbleComponent } from '../views/bubble/bubble.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  equipe: Equipe[] = [
    {
      name: 'Drº Leonardo Ponce da Motta',
      title: 'Contato Médico',
      getTitle: () => {
        return this.localeService.get('home.contact.team.medical');
      },
      image: './assets/equipe/leonardo.jpg',
      displayPhone: '+55 (21) 99997-8499',
      displayEmail: 'leonardo@cenaverio.com.br',
      email: 'leonardo@cenaverio.com.br',
      phone: '21999978499',
      whatsapp: '5521999978499'
    },
    {
      name: 'Drª Sarita Bonette',
      title: 'Contato Médico',
      getTitle: () => {
        return this.localeService.get('home.contact.team.medical');
      },
      image: './assets/equipe/sarita.jpg',
      displayPhone: '+55 (21) 98285-0393',
      displayEmail: 'saritabonette@cenaverio.com.br',
      email: 'saritabonette@cenaverio.com.br',
      phone: '21982850393',
      whatsapp: '5521982850393'
    },
    {
      name: 'Drª Mara Elisa de Oliveira Gama',
      title: 'Contato Odontológico',
      getTitle: () => {
        return this.localeService.get('home.contact.team.dental');
      },
      image: './assets/equipe/mara.jpg',
      displayPhone: '+55 (21) 98000-2009',
      displayEmail: 'maraodonto@cenaverio.com.br',
      email: 'maraodonto@cenaverio.com.br',
      phone: '21980002009',
      whatsapp: '5521980002009'
    }
  ];

  loader: Observable<boolean> = new Observable();

  constructor(
    private readonly titleService: Title,
    public readonly localeService: LocaleService,
    private readonly loaderService : LoaderService
  ) { }

  ngOnInit(): void {
    this.loader = this.loaderService.loader;

    {
      let userLocale = this.localeService.getUserLocale();
      let titleToSet = "Loading...";
      if(userLocale.startsWith('pt')) {
        titleToSet = "Carregando...";
      } else if(userLocale.startsWith('en')) {
        titleToSet = "Loading...";
      } else if(userLocale.startsWith('es')) {
        titleToSet = "Cargando...";
      }
      this.titleService.setTitle(titleToSet);
    }

    this.localeService.locale$.subscribe((locale) => {
      this.titleService.setTitle(this.localeService.get('home.title'));
    });
  }

  ngAfterViewInit(): void {
  }
  
  scroll(el: HTMLElement, block?: any, inline?: any) {
    if(block == null) {
      block = 'center';
    }
    if(inline == null) {
      inline = 'center';
    }
    el.scrollIntoView({block: block, inline: inline, behavior: "smooth"});
  }

  scrollToTop(): void {
    window.scroll(0,0);
  }

  changeLocale(): void {
    let newLocale = 'pt-br';
    switch (this.localeService.get('locale')) {
      case 'en':
        newLocale = 'pt-br'
        break;
      case 'pt-br':
        newLocale = 'es';
        break;
      case 'es':
        newLocale = 'en';
        break;
      default:
        newLocale = "pt-br";
        break;
    }
    this.localeService.setLocale(newLocale);
  }

  getLocaleImage() {
    switch (this.localeService.get('locale')) {
      case 'en':
        return "url('./assets/paises/bandeira_inglaterra.jpg')";
      case 'pt-br':
        return "url('./assets/paises/bandeira_brasil.jpg')";
      case 'es':
        return "url('./assets/paises/bandeira_espanha.jpg')";
      default:
        return "url('./assets/paises/bandeira_brasil.jpg')";
    }
  }

  openWhatsapp(numero: string): void {
    // let url = 'https://wa.me/' + numero + '/?text=Ol%C3%A1%2C%20gostaria%20de%20contratar%20os%20servi%C3%A7os%20da%20CenavRio.';
    // window.open(url, '_blank')!.focus();

  }

  openBubble(bubble: BubbleComponent): void {
    // console.log(event.currentTarget);
    bubble.explodeBubble();
  }

}
