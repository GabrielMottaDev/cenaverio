import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from 'src/app/home/home.component';
import { LocaleService } from 'src/app/services/locale.service';
import { BubbleComponent } from '../bubble/bubble.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('menuAppear', [
      state('true', style({ opacity: '0', transform: 'translateX(-100%)', })),
      state('false', style({ opacity: '1',  })),

      transition('true <=> false', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild('navbar') navbar! : ElementRef;
  @Input('elements') elements?: HTMLElement[]; // ElementRef

  isMenuOpen = false;
  // isMenuOpen = true;
  isSticky = false;

  iconOpen = faBars;

  constructor(public readonly localeService: LocaleService) { }

  ngOnInit(): void {
    // console.log(this.elements.empresa);
    this.elements?.map((element: HTMLElement) => {
      
    });
  }

  ngAfterViewInit(): void {
    window.onscroll = () => (this.onScrollFn());
  }

  toggleMenu(isOpen:boolean) {
    this.isMenuOpen=isOpen

    let body = document.getElementsByTagName('body')[0];
    if (this.isMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  onScrollFn(): void {
    // let sticky = this.navbar.nativeElement.offsetTop;
    // if (window.pageYOffset > sticky) {
    //   this.isSticky = true;
    // } else {
    //   this.isSticky = false;
    // }
  }

  getElement(id : string) {
    let [el] : any = this.elements?.filter((element : HTMLElement) => { return element.id == id})
    return el;
  }


  scroll(elementId: string, block?: any, inline?: any) {
    if(this.isMenuOpen){
      this.toggleMenu(false);
    }
    let element = this.getElement(elementId);
    if(block == null) {
      block = 'center';
    }
    if(inline == null) {
      inline = 'center';
    }
    // behavior: "auto"  | "instant" | "smooth",
    // block:    "start" | "center" | "end" | "nearest",
    // inline:   "start" | "center" | "end" | "nearest"
    // alert(element + '|' +  block + '|' + inline)
    element.scrollIntoView({block: block, inline: inline, behavior: "smooth"});
  }

}
