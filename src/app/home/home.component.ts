import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('header') header! : ElementRef;
  
  isSticky = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    window.onscroll = () => (this.onScrollFn());
  }
  
  onScrollFn(): void {
    let sticky = this.header.nativeElement.offsetTop;
    if (window.pageYOffset > sticky) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({block: "center", behavior: "smooth"});
  }

  scrollToTop(): void {
    window.scroll(0,0);
  }

  openWhatsapp(numero: string): void {
    let url = 'https://wa.me/' + numero + '/?text=Ol%C3%A1%2C%20gostaria%20de%20contratar%20os%20servi%C3%A7os%20da%20CenavRio.';
    window.open(url, '_blank')!.focus();
  }

}
