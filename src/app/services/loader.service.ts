import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleService } from './locale.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loading = true;
  public loader$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loader  = this.loader$.asObservable();

  constructor(
    private readonly localeService : LocaleService
  ) {
    this.init()
  }

  init() {
    this.localeService.locale$.subscribe((locale) => {
      if(this.loading == false){
        return;
      }
      if(typeof locale !== 'undefined' && locale) {
        this.loader$.next(false);
      } else {
        this.loader$.next(true);
        this.loading = true;
      }
    });
  }

}
