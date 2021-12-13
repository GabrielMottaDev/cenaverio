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
    window.onscroll = () => (this.testFunction());
  }
  
  testFunction(): void {
    let sticky = this.header.nativeElement.offsetTop;
    if (window.pageYOffset > sticky) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

}
