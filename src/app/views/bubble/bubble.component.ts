import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faAd, faAnchor, faCoffee, faPhone, faPhoneAlt, faPhoneSquareAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  animations: [
    trigger('explode', [
      state('true', style({ opacity: '0' })),
      state('false', style({ opacity: '1' })),

      transition('true <=> false', [
        animate('200ms ease-in')
      ])
    ]),
    trigger('explodeBtn', [
      state('true', style({ transform: 'rotateZ(0deg)', })),
      state('false', style({ transform: 'rotateZ(45deg)',  })),

      transition('true <=> false', [
        animate('150ms ease-in')
      ])
    ])
  ]
})
export class BubbleComponent implements OnInit, AfterViewInit {

  @Input('email') email?: string;
  @Input('phone') phone?: string;
  @Input('whatsapp') whatsapp?: string;

  @ViewChild('bubbles', { static: false }) bubbles?: ElementRef;
  isExploded = false;
  iconOpen = faPlus;
  iconEmail = faEnvelope;
  iconPhone = faPhoneSquareAlt;
  iconWhatsapp = faWhatsapp;

  constructor() { }

  ngOnInit(): void {
    console.log(this.email + ',' + this.phone + ', ' + this.whatsapp);
  }

  ngAfterViewInit() {
    for(let i=0; i<this.bubbles?.nativeElement.children.length;i++) {
      this.bubbles?.nativeElement.children[i].style.setProperty('left', `${(Math.cos(i*0.92) * 5.5) }em`)
      this.bubbles?.nativeElement.children[i].style.setProperty('top', `${(Math.sin(i*0.92) * 5.4)-2.2}em`)
    }
  }

  explodeBubble() {
    this.isExploded = !this.isExploded;
    // alert(this.bubbles)
    for(let i=0; i<this.bubbles?.nativeElement.children.length;i++) {
      this.bubbles?.nativeElement.children[i].style.setProperty('left', `${(Math.cos(i*0.92) * 5.5) }em`)
      this.bubbles?.nativeElement.children[i].style.setProperty('top', `${(Math.sin(i*0.92) * 5.4)-2.2}em`)
    }
  }

  openWhatsapp(): void {
    if(this.isExploded == false){
      return;
    }
    let url = 'https://wa.me/' + this.whatsapp + '/?text=Ol%C3%A1%2C%20gostaria%20de%20contratar%20os%20servi%C3%A7os%20da%20CenavRio.';
    window.open(url, '_blank')!.focus();
  }

  openEmail(): void {
    if(this.isExploded == false){
      return;
    }
    let url = 'mailto://patamar101@gmail.com';
    window.open(url, '_blank')!.focus();
  }

  openPhone(): void {
    if(this.isExploded == false){
      return;
    }
    let url = 'tel:' + this.phone;
    window.open(url, '_blank')!.focus();
  }

  // @HostListener("click") onClick() {
  //   this.explodeBubble();
  // }

}
