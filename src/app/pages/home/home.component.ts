import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  GooglePlay,
  AppStore,
  EqualizerBack,
  banner1,
  banner2,
  banner3,
  banner4,
  about1,
  about2,
  about3,
  wave,
} from '../../contants/listUrl';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChildren('start', { read: ElementRef })
  start!: QueryList<ElementRef>;

  GooglePlay = GooglePlay;
  AppStore = AppStore;
  EqualizerBack = EqualizerBack;
  banner1 = banner1;
  banner2 = banner2;
  banner3 = banner3;
  banner4 = banner4;
  about1 = about1;
  about2 = about2;
  about3 = about3;
  wave = wave;

  observer: any;
  toggle = false;
  constructor() {}
  ngOnInit(): void {
    this.intersectionObserver();
  }
  ngAfterViewInit() {
    this.start.forEach((d) => {
      console.log(d.nativeElement);
      this.observer.observe(d.nativeElement);
    });
  }
  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px 0px -40% 0px',
      threshold: [0.1, 0.5, 0.95, 1],
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRect.y != 0) {
        this.toggle = true;
      }
      if (
        entries[0].intersectionRatio >= 1 ||
        entries[0].intersectionRatio <= 0.1
      ) {
        this.toggle = false;
      }
    }, options);
  }
}
